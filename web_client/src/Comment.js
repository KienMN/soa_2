import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

export default class Comment extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Panel>
					<Panel.Heading>
						<Panel.Title componentClass="h3"><strong>{this.props.user}</strong> commented at</Panel.Title>
					</Panel.Heading>
					<Panel.Body>{this.props.content}</Panel.Body>
				</Panel>
			</div>
		)
	}
}