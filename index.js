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
//var fb_stream = require('./firebase-stream')
//var fb_api    = require('./firebase-api')

utils.validateFirebaseArgs(args)

var init = function() {
    console.log('initializing')
}

var connection = fb_conn(args).connect(function(err) {
    if (err) { console.log(err); process.exit(1) }
    if (!err) console.log('Connected to Firebase. Continuing...')
})
//var initInterval = setInterval(function() {
//    console.log('interval')
//    if (connection.validate()) { clearInterval(initInterval); init() }
//},1000)
