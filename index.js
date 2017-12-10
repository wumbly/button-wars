const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');

io.on('connection', function(socket) {
	socket.on('chat message', function(msg) {
		console.log('message: ' + msg);
		io.emit('send message', 'got message back');
	});
});

app.get('/', function(req, res) {
	res.send();
});

http.listen(3001, function() {
	console.log('listening on *:3001');
});
