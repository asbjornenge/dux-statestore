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
            this.dnsReady = (err == null)
            if (this.dnsReady && !this.dnsMessage) { 
                console.log('Dispatcher DNS resolved!')
                this.dnsMessage = true
            }
            if (!this.dnsReady && this.dnsMessage) { 
                console.log('Unable to resolve Dispatcher DNS'); 
                this.dnsMessage = false 
            }
            if (!this.dnsReady && !this.dnsMessge) {
                console.log('Unable to resolve Dispatcher DNS');
            }
            callback(err)
        }.bind(this))
    },

    checkConnection : function(callback) {
        console.log('Checking Dispatcher Connection')
        tcpp.ping({ address : this.args.dispatcher, port : 8000, timeout : 1000, attempts : 1 }, function(err, data) {
            this.connectionReady = (err != null)
            callback(err)
        }.bind(this))
    },

    checkState : function(callback) {
        this.checkDns(function(err) {
            if (err) { callback(); return }
            this.checkConnection(function(err) {
               callback() 
            })
        }.bind(this))
//        if (!this.root) this.connect()
//        if (!this.root.getAuth()) this.auth(callback)
//        else callback()
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
