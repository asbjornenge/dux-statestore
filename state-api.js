var http = require('http');

var StateApi = function(options, stateStore) {
    this.options      = options || {}
    this.options.port = this.options.port || 8000
    this.stateStore   = stateStore
}
StateApi.prototype = {
    start : function() {
        http.createServer(function (req, res) {
            console.log(req.url)
            res.writeHead(200, {'Content-Type': 'application/json'});
            var state = this.stateStore.state[req.url.slice(1)] || {}
            res.end(JSON.stringify(state))
        }.bind(this)).listen(8000)
    }
}

module.exports = StateApi 
