const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const Players = require('./server/players');

io.on('connection', function(socket) {
	const otherPlayers = Array.from(Players.getPlayers());
	const player = Players.makePlayer();
	socket.emit('connected', player, otherPlayers);
	socket.broadcast.emit('playerConnected', player);
	socket.on('disconnect', () => {
		Players.deletePlayer(player.id);
		io.emit('playerDisconnected', player.id);
	});
	socket.on('newPosition', e => {
		console.log(e);
	});
	socket.on('clicked', e => {
		console.log(e);
	});
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
