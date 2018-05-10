var express = require('express');
var app = express();
var server = require('http').createServer(app);
// http server를 socket.io server로 upgrade한다
var io = require('socket.io')(server);
io.set('transports', ['websocket']);

app.use(express.static('.'));

// connection event handler
// connection이 수립되면 event handler function의 인자로 socket인 들어온다
io.of('/lobby').on('connection', function(socket) 
{
	console.log('Client connection');

  // 접속한 클라이언트의 정보가 수신되면
  socket.on('login', function(data) 
  {
    console.log('login userid:' + data.userid + '\n name: ' + data.name);

    // socket에 클라이언트 정보를 저장한다
    socket.name = data.name;
    socket.userid = data.userid;
    socket.score = 0;

    var result = {score: socket.score, result: 1};
    socket.emit('login', result );
  });

  // 클라이언트로부터의 메시지가 수신되면
  socket.on('lobby', function(data) 
  {
    console.log('lobby userid:' + socket.userid + '\n name: ' + socket.name);

    var result = {result: 1};
    socket.emit('lobby', result );
  });

  socket.on('garage', function(data) 
  {
    console.log('garage userid:' + socket.userid + '\n name: ' + socket.name);

    var result = {result: 1};
    socket.emit('garage', result );
  });

  socket.on('room', function(data) 
  {
    console.log('room userid:' + socket.userid + '\n name: ' + socket.name);

    var result = {result: 1};
    socket.emit('room', result );
  });

  socket.on('gamestart', function(data) 
  {
    console.log('gamestart userid:' + socket.userid + '\n name: ' + socket.name);

    var result = {result: 1};
    socket.emit('gamestart', result );
  });  

  socket.on('gameend', function(data) 
  {
    console.log('gameend userid:' + socket.userid + '\n name: ' + socket.name);

    socket.score = socket.score + 1;
    var result = {score: socket.score, result: 1};
    socket.emit('gameend', result );
  }); 

  // force client disconnect from server
  socket.on('forceDisconnect', function() 
  {
    socket.disconnect();
  })

  socket.on('disconnect', function() 
  {
    console.log('user disconnected: ' + socket.name);
  });
});

server.listen(8081, function() 
{
  console.log('Socket IO server listening on port 8081');
});