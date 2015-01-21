var Firebase = require('firebase')

var FirebaseConnection = function(args) {
    this.args = args
    this.root = new Firebase(args['firebase-url']+args['firebase-path'])
}
FirebaseConnection.prototype = {

    connect : function(callback) {
        this.root.authWithCustomToken(this.args['firebase-secret'], function(err, auth) {
            if (typeof callback === 'function') callback(err, auth)
        })
        return this
    },

    validate : function() {
        console.log(this.root)
        return true
    }

}

module.exports = function(args) { return new FirebaseConnection(args) }
