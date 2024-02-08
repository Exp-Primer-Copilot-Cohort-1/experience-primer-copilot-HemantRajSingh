// Create web server

// Load the http module to create an http server.
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var mime = require('mime');
var qs = require('querystring');
var comments = [];

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    if (pathname == '/') {
        pathname = '/index.html';
    }
    if (pathname == '/index.html') {
        fs.readFile(path.join(__dirname, pathname), function (err, data) {
            if (err) {
                response.writeHead(404, { 'Content-Type': 'text/html' });
                response.end('<h1>404 Not Found</h1>');
            }
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(data);
        });
    } else if (pathname == '/comments') {
        if (request.method == 'GET') {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(comments));
        } else if (request.method == 'POST') {
            var str = '';
            request.on('data', function (data) {
                str += data;
            });
            request.on('end', function () {
                var comment = qs.parse(str);
                comments.push(comment);
                response.end();
            });
        }
    } else {
        fs.readFile(path.join(__dirname, pathname), function (err, data) {
            if (err) {
                response.writeHead(404, { 'Content-Type': 'text/html' });
                response.end('<h1>404 Not Found</h1>');
            }
            response.writeHead(200, { 'Content-Type': mime.lookup(pathname) });
            response.end(data);
        });
    }
});

// Listen on port 8000, IP defaults to