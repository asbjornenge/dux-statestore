var dns  = require('dns')
var tcpp = require('tcp-ping')

var DispatcherConnection = function(args) {
    this.args              = args
    this.dnsReady          = false
    this.connectionReady   = false
    this.dnsMessage        = false
    this.connectionMessage = false
    this.connectMessage    = false
}
DispatcherConnection.prototype = {

    checkDns : function(callback) {
        dns.resolve4(this.args.dispatcher, function(err, addresses) {
            var isReady  = (err == null)
            var wasReady = this.dnsReady
            this.dnsReady = isReady
            this.displayDnsStatusMaybe(isReady != wasReady)
            callback(err)
        }.bind(this))
    },

    displayDnsStatusMaybe : function(newstate) {
        if (!newstate && this.dnsMessage) return
        this.dnsMessage = true
        if (this.dnsReady) console.log('Resolving Dispatcher...')
        else console.log('Unable to resolve Dispatcher DNS...')
    },

    checkConnection : function(callback) {
        tcpp.ping({ address : this.args.dispatcher, port : 8000, timeout : 1000, attempts : 1 }, function(err, data) {
            var isReady  = (err == null)
            var wasReady = this.connectionReady
            this.connectionReady = isReady
            this.displayConnectionStatusMaybe(isReady != wasReady)
            callback(err)
        }.bind(this))
    },

    displayConnectionStatusMaybe : function(newstate) {
        if (!newstate && this.connectionMessage) return
        this.connectionMessage = true
        if (this.connectionReady) console.log('Verifying Dispatcher connection...')
        else console.log('Unable to verify Dispatcher connection...')
    },

    checkState : function(callback) {
        this.checkDns(function(err) {
            if (err) { callback(); return }
            this.checkConnection(function(err) {
               callback() 
            })
        }.bind(this))
    },

    keepAlive : function(interval, callback) {
        setInterval(function() {
            this.checkState(callback)
        }.bind(this),interval)
        this.checkState(callback)
    },

    ready : function() {
        var ready = (this.dnsReady && this.connectionReady)
        if (ready && !this.connectMessage) { console.log('Connected to Dispatcher! :-D'); this.connectMessage = true }
        if (!ready && this.connectMessage) { console.log('Disconnected from Dispatcher! :-('); this.connectMessage = false }
        return ready
    }
}

module.exports = function(args) { return new DispatcherConnection(args) }
