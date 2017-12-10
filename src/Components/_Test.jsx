import React from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

socket.on('chat message', () => {
	console.log('Got the message!');
});

socket.on('send message', msg => {
	console.log(msg);
});

export default class _Test extends React.Component {
	emit = () => {
		socket.emit('chat message', 'Hey!');
	};

	render() {
		return <div onClick={this.emit}>Hey</div>;
	}
}
