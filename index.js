#!/usr/bin/env node
var args = require('minimist')(process.argv.slice(2), {
    default : {
        'firebase-url'    : process.env['FIREBASE_URL'],
        'firebase-path'   : '/',
        'firebase-secret' : process.env['FIREBASE_SECRET']
    }
})
var utils = require('./utils')

utils.validateFirebaseArgs(args)

console.log('GOT HERE')

// interval here until all criteria are met, then kill interval and init store ... ?
