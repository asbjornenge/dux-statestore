var utils = {

    validateFirebaseArgs : function(args) {
        if (!args['firebase-url'])    { console.log('Missing firebase-url');    process.exit(1) }
        if (!args['firebase-secret']) { console.log('Missing firebase-secret'); process.exit(1) }
    }

}

module.exports = utils
