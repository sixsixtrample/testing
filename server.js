/**
 * Created by andy on 2/13/14.
 */

var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var cache = {};

function send404Response(response)
{
    response.writeHead(404,{'Content-Type': 'text/plain'});
    response.end('Error 404: resource not found');
}

function sendFile(response, filePath, fileContents)
{
    response.writeHead(200,{'Content-Type': mime.lookup(path.basename(filePath))});
    response.end(fileContents);
}

function serveStatic(response, cache, absPath)
{
    if(cache[absPath])
    {
        sendFile(response, absPath, cache[absPath]);
    }else{
        fs.exists(absPath, function(exists) {
            if(exists)
            {
                fs.readFile(absPath, function(err, data) {
                    if(err)
                    {
                        send404(response);
                    }else{
                        cache[absPath] = data;
                        sendFile(response, absPath, data);
                    }
                });
            }else{
                send404Response(response);
            }
        });
    }
}

var server = http.createServer(function(request, response) {
    var filePath = false;
    if(request.url == '/')
    {
        filePath = 'public/index.html';
    }else
    {
        filePath = 'public' + request.url;
    }

    var absPath = './' + filePath;
    serveStatic(response, cache, absPath);
});