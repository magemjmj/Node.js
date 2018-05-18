var express = require('express');
var app = express();
var server = require('http').createServer(app);
// http server를 socket.io server로 upgrade한다
var io = require('socket.io')(server);
//io.set('transports', ['websocket']);

var logined_clinet = 0;

app.use(express.static('.'));

// connection event handler
// connection이 수립되면 event handler function의 인자로 socket인 들어온다
io.of('/').on('connection', function(socket) 
{
	console.log('Client connection');

	// 접속한 클라이언트의 정보가 수신되면
	socket.on('login', function(data) 
	{
		socket.binaryType = 'arraybuffer';

		logined_clinet = logined_clinet + 1;

		if (logined_clinet > 1)
			io.emit('login', "" );
	});

	// 클라이언트로부터의 메시지가 수신되면
	socket.on('sendinput', function(id, data) 
	{
		console.log('sendinput ' + id);
		socket.broadcast.emit('receiveinput', id, data);
	});

	// force client disconnect from server
	socket.on('forceDisconnect', function() 
	{
		socket.disconnect();
	});

	socket.on('disconnect', function() 
	{
		logined_clinet = logined_clinet - 1;
		console.log('user disconnected: ' + socket.name);
	});
});

server.listen(8081, function() 
{
	console.log('Socket IO server listening on port 8081');
});