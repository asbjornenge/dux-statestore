#!/usr/bin/env node
var args = require('minimist')(process.argv.slice(2), {
    default : {
        'firebase-url'    : process.env['FIREBASE_URL'],
        'firebase-path'   : '/',
        'firebase-secret' : process.env['FIREBASE_SECRET']
    }
})
var utils   = require('./utils')
var fb_conn = require('./firebase-connection')
//var dispatcher_connection = require('./dispatcher-connection')

//var fb_stream = require('./firebase-stream')
//var fb_api    = require('./firebase-api')

utils.validateFirebaseArgs(args)

var firebase_connection = fb_conn(args)

var running = false
var runapp = function() {
    if (running) return
    try {
        running = true
        console.log('initializing')
    } catch(e) {
        running = false
    }
}

var check_state = function() {
    console.log('checking state', firebase_connection.ready())
    if (firebase_connection.ready()) runapp()
}
firebase_connection.keepAlive(5000, function() {
    check_state()
})
//dispatcher_connection.keepAlive(function() {
//    check_state()
//})


//var tcpp = require('tcp-ping')
//var connection = fb_conn(args).connect(function(err) {
//    if (err) { console.log(err); process.exit(1) }
//    if (!err) console.log('Connected to Firebase. Continuing...')
//     
//    tcpp.ping({ address : 'dispatcher.dux.test', port : 8000, timeout : 1000, attempts : 10}, function(err, data) {
//        console.log(err, data)
//    }) 
//})
