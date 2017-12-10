const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const Players = require('./server/players');

io.on('connection', function(socket) {
	const otherPlayers = Array.from(Players.getPlayers());
	const player = Players.makePlayer();
	const playerId = player.id;

	socket.emit('connected', player, otherPlayers);
	socket.broadcast.emit('playerConnected', player);

	socket.on('disconnect', () => {
		Players.deletePlayer(playerId);
		io.emit('playerDisconnected', playerId);
	});

	socket.on('newPosition', ({ x, y }) => {
		socket.broadcast.emit(
			'playerUpdated',
			Players.updatePlayerPosition(playerId, x, y)
		);
	});

	socket.on('clicked', id => {
		socket.broadcast.emit(
			'playerUpdated',
			Players.decrementPlayerHealth(playerId)
		);
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
