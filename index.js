#!/usr/bin/env node
var args = require('minimist')(process.argv.slice(2), {
    default : {
        'firebase-url'    : process.env['FIREBASE_URL'],
        'firebase-path'   : '/',
        'firebase-secret' : process.env['FIREBASE_SECRET'],
        'dispatcher'      : 'dux-dispatcher.dux.test'
    }
})
var utils           = require('./utils')
var fb_conn         = require('./firebase-connection')
var dp_conn         = require('./dispatcher-connection')
var StateDispatcher = require('./state-dispatcher')

utils.validateFirebaseArgs(args)

var firebase_connection = fb_conn(args)
var dispatcher_connection = dp_conn(args)
var dispatcher = new StateDispatcher(firebase_connection, dispatcher_connection)

var check_state = function() {
    var ready = (firebase_connection.ready() && dispatcher_connection.ready())
    if (ready && !dispatcher.running) dispatcher.start()
    if (!ready && dispatcher.running) dispatcher.stop()
}
firebase_connection.keepAlive(5000, function() {
    check_state()
})
dispatcher_connection.keepAlive(5000,function() {
    check_state()
})

