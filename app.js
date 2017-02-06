/**
 * Created by tintoll on 2017-02-06.
 */
var socketio = require('socket.io');
var express = require('express');
var http = require('http');
var fs = require('fs');


var seats = [
    [1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1],
    [1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1],
    [0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1],
];

var app = express();
var server = http.createServer(app);

app.get("/",function (req, res, next) {
    fs.readFile('htmlPage.html',function (error,data) {
        res.send(data.toString());
    });
});

app.get('/seats',function (req, res, next) {
    console.log(seats);
    res.send(seats);
});

server.listen(52273,function () {
    console.log('server running 52273');
});

var io = socketio.listen(server);
io.sockets.on('connection', function (socket) {
   socket.on('reserve',function (data) {
       seats[data.y][data.x] = 2;
       io.sockets.emit('reserve',data);
   })
});
