const uuid = require('uuid/v4');

const players = new Map();

export const makePlayer = () => {
	const player = {
		id: uuid(),
		wins: 0,
		losses: 0,
		games: 0,
	};
	players.set(player.id, player);
	return player;
};

export const getPlayer = id => ({ ...players.get(id) });

export const incrementPlayerStats = (id, winInc, lossInc, gamesInc) => {
	const player = players.get(id);
	const newPlayer = {
		...player,
		wins: player.wins + winInc,
		losses: player.losses + lossInc,
		games: player.games + gamesInc,
	};
	players.set(id, newPlayer);
	return newPlayer;
};

export const deletePlayer = id => {
	player.delete(id);
};
