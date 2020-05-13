var express = require('express');
var app = express();
var serv = require('http').Server(app);
app.get('/',function(req, res) {res.sendFile(__dirname+'/client/index.html');});
app.use('/client',express.static(__dirname+'/client'));
serv.listen(80);
var sendall = function(data) {
	io.sockets.emit('draw',data);
}
var io = require('socket.io')(serv,{});
io.sockets.on('connection',function(socket) {
	console.log('connection');
	socket.on('line',function(data) {
		sendall(data);
	});
});

