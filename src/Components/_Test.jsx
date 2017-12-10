import React from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

socket.on('chat message', () => {
	console.log('Got the message!');
});

socket.on('send message', msg => {
	console.log(msg);
});

const keys = {
	up: false,
	down: false,
	left: false,
	right: false,
};

export default class _Test extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			position: {
				x: 0,
				y: 0,
			},
		};
	}

	move = () => {
		let { x, y } = this.state.position;
		if (keys.up === true) y++;
		if (keys.down === true) y--;
		if (keys.left === true) x--;
		if (keys.right === true) x++;
		let position = { x, y };
		console.log(position);
		this.setState({ position });
	};

	componentWillMount() {
		window.addEventListener('keydown', event => {
			console.log(event.key);
			if (event.key === 'ArrowUp' || event.key === 'w') keys.up = true;
			if (event.key === 'ArrowDown' || event.key === 's') keys.down = true;
			if (event.key === 'ArrowLeft' || event.key === 'a') keys.left = true;
			if (event.key === 'ArrowRight' || event.key === 'd') keys.right = true;

			if (keys.up || keys.down || keys.left || keys.right) {
				let interval = setInterval(() => {
					this.move();
					if (!keys.up && !keys.down && !keys.left && !keys.right) {
						clearInterval(interval);
					}
				}, 75);
			}
		});
		window.addEventListener('keyup', event => {
			if (event.key === 'ArrowUp' || event.key === 'w') keys.up = false;
			if (event.key === 'ArrowDown' || event.key === 's') keys.down = false;
			if (event.key === 'ArrowLeft' || event.key === 'a') keys.left = false;
			if (event.key === 'ArrowRight' || event.key === 'd') keys.right = false;
		});
	}

	emit = () => {
		socket.emit('chat message', 'Hey!');
	};

	render() {
		return (
			<div
				style={{ position: 'absolute', minWidth: 'auto', minHeight: 'auto' }}
			>
				<div
					style={{
						backgroundColor: 'black',
						position: 'relative',
						height: '10px',
						width: '10px',
						top: -this.state.position.y,
						left: this.state.position.x,
					}}
				/>
			</div>
		);
	}
}
