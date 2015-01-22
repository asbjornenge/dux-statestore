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
var dp_conn = require('./dispatcher-connection')

//var fb_stream = require('./firebase-stream')
//var fb_api    = require('./firebase-api')

utils.validateFirebaseArgs(args)

var firebase_connection = fb_conn(args)
var dispatcher_connection = dp_conn(args)
var running = false
var runapp = function() {
    if (running) return
    try {
        running = true
        console.log('RUNNING')
    } catch(e) {
        running = false
    }
}

var check_state = function() {
//    console.log('checking state')
//    console.log('firebase', firebase_connection.ready())
//    console.log('dispatcher', dispatcher_connection.ready())
    if (firebase_connection.ready() && dispatcher_connection.ready()) runapp()
}
firebase_connection.keepAlive(5000, function() {
    check_state()
})
dispatcher_connection.keepAlive(5000,function() {
    check_state()
})

