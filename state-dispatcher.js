var diff       = require('deep-diff').diff
var chalk      = require('chalk')
var prettyjson = require('prettyjson')

var StateDispatcher = function(firebase, dispatcher) {
    this.running    = false
    this.firebase   = firebase
    this.dispatcher = dispatcher
    this.state      = {}
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
    diffState : function(snap) {
        var new_state = snap.val()
        var cur_state = this.state
        var difference = diff(cur_state, new_state)
        var to_distribute = difference.filter(function(d) {
            return d.kind != 'N'
        }).map(function(d) {
            if (d.kind == 'D') return { state : d.path[0], value : null }
            return { state : d.path[0] }
        })
        var fresh_state = Object.keys(new_state).filter(function(s) {
            return !cur_state.hasOwnProperty(s)
        }).map(function(s) {
            return { state : s }
        })
        this.state = new_state || {}
        this.distributeState(to_distribute.concat(fresh_state))
    },
    distributeState : function(to_distribute) {
        to_distribute.forEach(function(dist) {
            console.log('Dispatching', chalk.cyan(dist.state))
            console.log(prettyjson.render(this.state[dist.state],{}))
            console.log('--------------------------')
            this.dispatcher.client.publish('/'+dist.state, this.state[dist.state])
        }.bind(this))
    },
    startListeners : function() {
        this.firebase.root.on('value', this.diffState.bind(this))
    },
    stopListeners : function() {
        this.firebase.root.off('value', this.diffState.bind(this))
    }

}

module.exports = StateDispatcher
