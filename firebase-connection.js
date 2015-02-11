var Firebase = require('firebase')
var chalk    = require('chalk')

var FirebaseConnection = function(args) {
    this.args = args
    this.connectMessage = false
}
FirebaseConnection.prototype = {

    connect : function() {
        console.log('Connecting to Firebase...')
        this.root = new Firebase(this.args['firebase-url']+this.args['firebase-path'])
    },

    auth : function(callback) {
        console.log(chalk.yellow('Authenticating with Firebase...'))
        this.root.authWithCustomToken(this.args['firebase-secret'], function(err, auth) {
            if (typeof callback === 'function') callback(err, auth)
        })
    },

    checkState : function(callback) {
        if (!this.root) this.connect()
        if (!this.root.getAuth()) this.auth(callback)
        else callback()
    },

    keepAlive : function(interval, callback) {
        setInterval(function() {
            this.checkState(callback)
        }.bind(this),interval)
        this.checkState(callback)
    },

    ready : function() {
        var ready = (this.root != undefined && this.root.getAuth() != null)
        if (ready && !this.connectMessage) { console.log(chalk.green('Connected to Firebase! :-D')); this.connectMessage = true }
        if (!ready && this.connectMessage) { console.log(chalk.red('Disconnected from Firebase! :-(')); this.connectMessage = false }
        return ready
    }
}

module.exports = function(args) { return new FirebaseConnection(args) }
