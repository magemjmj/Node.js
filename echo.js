var express = require('express');
var app = express();
var server = require('http').createServer(app);
// http server를 socket.io server로 upgrade한다
var io = require('socket.io')(server);
io.set('transports', ['websocket']);

app.use(express.static('.'));

// connection event handler
// connection이 수립되면 event handler function의 인자로 socket인 들어온다
io.of('/').on('connection', function(socket) 
{
	console.log('Client connection');

	// 접속한 클라이언트의 정보가 수신되면
	socket.on('login', function(data) 
	{
		console.log('login userid:' + data.userid);

		socket.binaryType = 'arraybuffer';

		// socket에 클라이언트 정보를 저장한다

		socket.userid = data.userid;

		socket.emit('login', "" );
	});

	// 클라이언트로부터의 메시지가 수신되면
	socket.on('sendinput', function(data) 
	{
		//console.log('lobby userid:' + socket.userid + '\n name: ' + socket.name);

		//console.log(data);
		
		/*
		var buffer = new ArrayBuffer(9);
		var frame = new Uint32Array(buffer, 0, 1);
		var up = new Uint8Array(buffer, 4, 1);
		var down = new Uint8Array(buffer, 5, 1);
		var left = new Uint8Array(buffer, 6, 1);
		var right = new Uint8Array(buffer, 7, 1);
		var jump = new Uint8Array(buffer, 8, 1);
		*/

		socket.emit('receiveinput', data);
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