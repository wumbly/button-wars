const uuid = require('uuid/v4');

const players = new Map();

const makePlayer = () => {
	const player = Object.freeze({
		id: uuid(),
		wins: 0,
		losses: 0,
		games: 0,
	});
	players.set(player.id, player);
	return player;
};

const getPlayer = id => players.get(id);

const incrementPlayerStats = (id, winInc, lossInc, gamesInc) => {
	const player = players.get(id);
	const newPlayer = Object.freeze({
		...player,
		wins: player.wins + winInc,
		losses: player.losses + lossInc,
		games: player.games + gamesInc,
	});
	players.set(id, newPlayer);
	return newPlayer;
};

const deletePlayer = id => {
	player.delete(id);
};

module.exports = {
	makePlayer,
	getPlayer,
	deletePlayer,
	incrementPlayerStats,
};
