import React from 'react';
import io from 'socket.io-client';
import PlayerButton from './Components/PlayerButton';

const keys = {
	up: false,
	down: false,
	left: false,
	right: false,
};

export default class Game extends React.Component {
	constructor(props) {
		super(props);
		const socket = (this.socket = io('http://localhost:3001'));
		this.state = {
			self: null,
			others: [],
		};
		socket.on('connected', (self, others) => {
			this.setState({
				self,
				others,
			});
		});
		socket.on('playerConnected', newPlayer =>
			this.setState(prevState => {
				return {
					...prevState,
					others: [...prevState.others, newPlayer],
				};
			})
		);
		// socket.on('playerDisconnected', playerId =>
		// 	this.setState(prevState => {
		// 		return {
		// 			...prevState,
		// 			others: [...prevState.others, newPlayer],
		// 		};
		// 	})
		// );
	}

	onKeyDown = event => {
		console.log(event.key);
		if (event.key === 'ArrowUp' || event.key === 'w') keys.up = true;
		if (event.key === 'ArrowDown' || event.key === 's') keys.down = true;
		if (event.key === 'ArrowLeft' || event.key === 'a') keys.left = true;
		if (event.key === 'ArrowRight' || event.key === 'd') keys.right = true;

		// if (keys.up || keys.down || keys.left || keys.right) {
		// 	let interval = setInterval(() => {
		// 		this.move();
		// 		if (!keys.up && !keys.down && !keys.left && !keys.right) {
		// 			clearInterval(interval);
		// 		}
		// 	}, 75);
		// }
	};

	onKeyUp = event => {
		if (event.key === 'ArrowUp' || event.key === 'w') keys.up = false;
		if (event.key === 'ArrowDown' || event.key === 's') keys.down = false;
		if (event.key === 'ArrowLeft' || event.key === 'a') keys.left = false;
		if (event.key === 'ArrowRight' || event.key === 'd') keys.right = false;
	};

	componentDidMount() {
		window.addEventListener('keydown', this.onKeyDown);
		window.addEventListener('keyup', this.onKeyUp);
		this.tick();
	}

	tick = () => {
		// let { x, y } = this.state.self;

		let x = 0,
			y = 0;
		if (keys.up === true) y++;
		if (keys.down === true) y--;
		if (keys.left === true) x--;
		if (keys.right === true) x++;
		if (x !== 0 || y !== 0) {
			this.setState(
				prevState => ({
					...prevState,
					self: {
						...prevState.self,
						x: prevState.self.x + x,
						y: prevState.self.y + y,
					},
				}),
				() => {
					const { x, y } = this.state.self;
					this.socket.emit('newPosition', { x, y });
				}
			);
		}
		this.tickCallbackId = requestAnimationFrame(this.tick);
	};

	componentWillUnmount() {
		cancelAnimationFrame(this.tickCallbackId);
		window.removeEventListener('keydown', this.onKeyDown);
		window.removeEventListener('keyup', this.onKeyUp);
	}

	render() {
		const self = this.state.self;
		return (
			<div style={{ position: 'absolute', width: 100, height: 100 }}>
				{self && <PlayerButton id={self.id} x={self.x} y={self.y} />}
				{this.state.others.map(e => <PlayerButton id={e.id} x={e.x} y={e.y} />)}
			</div>
		);
	}
}
