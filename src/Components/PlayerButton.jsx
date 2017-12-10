import React from 'react';

export default class PlayerButton extends React.Component {
	render() {
		return (
			<button>
				<div>{this.props.playerId}</div>
				<div>{this.props.health}</div>
			</button>
		);
	}
}
