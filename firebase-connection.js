var firebase = require('firebase')

var FirebaseConnection = function(args) {}
FirebaseConnection.prototype = {

    validate : function() {
        return true
    }

}

module.exports = function(args) { return new FirebaseConnection(args) }
