import React from 'react';

export default class PlayerButton extends React.Component {
	render() {
		return (
			<div
				style={{
					backgroundColor: 'black',
					position: 'relative',
					height: '10px',
					width: '10px',
					top: -this.props.y,
					left: this.props.x,
				}}
			/>
		);
	}
}
