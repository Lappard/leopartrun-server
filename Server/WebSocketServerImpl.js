/**
 * @author Jonathan Wiemers
 */

'use strict';
var fs = require('fs');
function WebSocketServerImpl() {

//openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ssl.key -out ssl.crt
    console.log(__dirname);
    var ws_cfg = {
          ssl: true,
          port: 1337,
          ssl_key: __dirname + '/cert/ssl.key',
          ssl_cert: __dirname + '/cert/ssl.crt'
    };

    var httpServ = require('http');
    var app = null;
    var processRequest = function(req, res) {
        res.statusCode = 404;
        res.end();
    };
    app = httpServ.createServer(processRequest).listen(ws_cfg.port);

    var WebSocketServer = require('ws').Server,
        _eventStream = require('./EventStream'),
        _wss = new WebSocketServer({
            server: app
        });
    if (_wss) {
        console.log('Server started on port: ' + ws_cfg.port);
    } else {
        new Error('Could not start server!');
    }
    _wss.on('connection', function connection(ws) {
        _eventStream.emit('new-connection', ws);
    });

};


module.exports = new WebSocketServerImpl();
