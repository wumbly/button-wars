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

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.end('');
});

http.listen(3001, function() {
	console.log('listening on *:3001');
});
