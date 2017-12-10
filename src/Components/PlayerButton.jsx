import React from 'react';

export default class PlayerButton extends React.Component {
	render() {
		return (
			<button onClick={() => this.props.onClick(this.props.playerId)}>
				<div>{this.props.playerId}</div>
				<div>{this.props.health}</div>
			</button>
		);
	}
}
