/**
 * Created by andy on 2/13/14.
 */

var http = require('http');

var server = http.createServer(function(req, res) {
    res.writeHead(200,{"Content-Type": "text/plain"});
    res.end("Hello world\n");
});


server.listen(8000);

console.log('listening');

