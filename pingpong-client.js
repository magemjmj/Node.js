var io = require('socket.io-client');
//io.set('transports', ['websocket']);

var socket = io.connect('http://localhost:8081', {reconnect: true});


socket.on('connect', function(data)
{
	console.log('connect');

	socket.emit('pings');

	socket.on('pongs', function(data) 
	{
		console.log('pong');
		socket.emit('pings');
	});

	socket.on('disconnect', function(data)
	{
		console.log('disconnect');
	});

});

