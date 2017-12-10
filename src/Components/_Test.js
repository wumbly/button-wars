import React from 'react';
import io from 'socket.io';

const socket = io('http://localhost:3001/');

socket.on('chat message', () => {
	console.log('Got the message!');
});

export default class _Test extends React.Component {
	emit = () => {
		socket.emit('chat message');
	};

	render() {
		return <div onClick={this.emit}>Hey</div>;
	}
}
