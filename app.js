const express = require('express');
const app = express();
const serv = require('http').createServer(app);
const io = require('socket.io')(serv, {});

/**
 * Socket IO
 */
io.sockets.on('connection', function (socket) {
    socket.on('line', function (data) {
        sendline(data);
    });
    socket.on('clear', function (data) {
        sendline(data);
    });
});

function sendline(data) {
    io.emit('draw', data);
}

function sendclear(data) {
    io.emit('clear', data);
}

/**
 * Setting the static path
 */
app.use('/client', express.static(__dirname + '/client'));

/**
 *  Routes
 */
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

serv.listen(80);
