

var StateDispatcher = function(firebase, dispatcher) {
    this.running    = false
    this.firebase   = firebase
    this.dispatcher = dispatcher
    this.states     = {}
}
StateDispatcher.prototype = {

    start : function() {
        console.log('starting')
        this.running = true
        this.startListeners()
    },
    stop : function() {
        console.log('stopping')
        this.running = false
        this.stopListeners()
    },
    distributeState : function(snap) {
        var state = snap.val()
        this.state = state || {}
        console.log('value', this.state)
    },
    startListeners : function() {
        this.firebase.root.on('value', this.distributeState)
    },
    stopListeners : function() {
        this.firebase.root.off('value', this.distributeState)
    }

}

module.exports = StateDispatcher
