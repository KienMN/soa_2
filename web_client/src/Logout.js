import React, {Component} from 'react';
import {PageHeader} from 'react-bootstrap'

class Logout extends Component {
	render() {
		localStorage.removeItem("username");
		localStorage.removeItem("tokenId");
		localStorage.removeItem("type");
		return(
			<PageHeader>Thank you for using our service</PageHeader>
		)
	}
}

export default Logout;