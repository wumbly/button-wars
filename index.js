const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const Players = require('./server/players');
console.log(Players);

io.on('connection', function(socket) {
	const { id: playerId } = Players.makePlayer();
	socket.on('disconnect', () => {
		Players.deletePlayer(playerId);
		io.emit('playerDisconnected', playerId);
	});
	socket.on('newPosition', e => {
		console.log(e);
	});
	socket.on('clicked', e => {
		console.log(e);
	});
	io.emit('playerConnected', playerId);
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
