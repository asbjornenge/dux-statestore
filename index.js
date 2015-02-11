#!/usr/bin/env node
var args = require('minimist')(process.argv.slice(2), {
    default : {
        'firebase-url'       : process.env['FIREBASE_URL'],
        'firebase-path'      : '/',
        'firebase-secret'    : process.env['FIREBASE_SECRET'],
        'dispatcher-host'    : process.env['DISPATCHER_HOST'],
        'dispatcher-host'    : process.env['DISPATCHER_HOST'],
        'retry-interval'     : process.env['RETRY_INTERVAL']     || 5000,
        'connection-timeout' : process.env['CONNECTION_TIMEOUT'] || 1000
    }
})
var chalk           = require('chalk')
var cowsay          = require('cowsay')
var silly           = require('sillystring')
var utils           = require('./utils')
var fb_conn         = require('./firebase-connection')
var dp_conn         = require('dux-dispatcher-connection')
var StateDispatcher = require('./state-dispatcher')
var StateApi        = require('./state-api')

utils.validateFirebaseArgs(args)

var firebase_connection = fb_conn(args)
var dispatcher_connection = dp_conn({
    host     : args['dispatcher-host'],
    port     : args['dispatcher-port'],
    interval : args['retry-interval'],
    timeout  : args['connection-timeout']
})
var dispatcher = new StateDispatcher(firebase_connection, dispatcher_connection)
var api        = new StateApi({}, dispatcher) 

var check_state = function() {
    var ready = (firebase_connection.ready() && dispatcher_connection.ready)
    if (ready && !dispatcher.running) { 
        dispatcher.start() 
        console.log(chalk.magenta('Starting State Dispatcher ₍˄·͈༝·͈˄*₎◞'))
        setTimeout(function() {
            api.start()
            console.log(chalk.magenta('Starting State HTTP API ~(=^‥^)'))
            console.log(chalk.cyan(cowsay.say({ text:"I'm READY for "+silly(), w:true, W:35 })))  
        },3000) 
    } 
    if (!ready && dispatcher.running) {
        console.log(chalk.red(cowsay.say({ text:'Stopping Dispatcher', d:true })))  
        dispatcher.stop()
    }
}
firebase_connection.keepAlive(5000, function(err) {
    if (err) console.error('Firebase Connection Error:',err)
    check_state()
})
dispatcher_connection.listen()

