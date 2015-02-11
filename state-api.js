var http  = require('http')
var chalk = require('chalk')

var StateApi = function(options, stateStore) {
    this.options      = options || {}
    this.options.port = this.options.port || 8000
    this.stateStore   = stateStore
}
StateApi.prototype = {
    start : function() {
        console.log(chalk.green('Starting State HTTP API :-)'))
        http.createServer(function (req, res) {
            console.log(req.url)
            var state = this.stateStore.state[req.url.slice(1)]
            if (state) res.writeHead(200, {'Content-Type': 'application/json'})
            else       res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(state || []))
        }.bind(this)).listen(8000)
    }
}

module.exports = StateApi 
