const uuid = require('uuid/v4');

const players = new Map();

const makePlayer = () => {
	const player = Object.freeze({
		id: uuid(),
		x: Math.round(Math.random() * 100),
		y: Math.round(Math.random() * 100),
		health: 100,
	});
	players.set(player.id, player);
	return player;
};

const getPlayer = id => players.get(id);

const getPlayers = () => players.values();

// const incrementPlayerStats = (id, winInc, lossInc, gamesInc) => {
// 	const player = players.get(id);
// 	const newPlayer = Object.freeze({
// 		...player,
// 		wins: player.wins + winInc,
// 		losses: player.losses + lossInc,
// 		games: player.games + gamesInc,
// 	});
// 	players.set(id, newPlayer);
// 	return newPlayer;
// };

const updatePlayerPosition = (id, x, y) => {
	const player = players.get(id);
	const newPlayer = Object.freeze({
		...player,
		x,
		y,
	});
	players.set(id, newPlayer);
	return newPlayer;
};

const decrementPlayerHealth = id => {
	const player = players.get(id);
	const newPlayer = Object.freeze({
		...player,
		health: player.health - 1,
	});
	players.set(id, newPlayer);
	return newPlayer;
};

const deletePlayer = id => {
	players.delete(id);
};

module.exports = {
	makePlayer,
	getPlayer,
	getPlayers,
	deletePlayer,
	updatePlayerPosition,
	decrementPlayerHealth,
	// incrementPlayerStats,
};
