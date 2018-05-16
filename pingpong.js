var express = require('express');
var app = express();
var server = require('http').createServer(app);
// http server를 socket.io server로 upgrade한다
var io = require('socket.io')(server);
//io.set('transports', ['websocket']);

app.use(express.static('.'));

// connection event handler
// connection이 수립되면 event handler function의 인자로 socket인 들어온다
io.of('/').on('connection', function(socket) 
{
	console.log('Client connection');

	// 접속한 클라이언트의 정보가 수신되면
	socket.on('pings', function(data) 
	{
		console.log('ping');
		socket.emit('pongs');
	});

	// force client disconnect from server
	socket.on('forceDisconnect', function() 
	{
		socket.disconnect();
	});

	socket.on('disconnect', function() 
	{
		console.log('user disconnected: ' + socket.name);
	});
});

server.listen(8081, function() 
{
	console.log('Socket IO server listening on port 8081');
});