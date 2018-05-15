import React, { Component } from 'react';
import Navigation from './Navigation';
import { Row, Col, Nav, NavItem } from 'react-bootstrap';
import './Dashboard.css';
import PointList from './PointList';
import Feedback from './Feedback';
import Semester from './Semester';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeKey: 0
		}
		this.handleSideMenuClick = this.handleSideMenuClick.bind(this);
		this.isLoggedIn = this.isLoggedIn.bind(this);
	}

	// Verifying whether user is logged in or not
	isLoggedIn() {
		return !(localStorage.getItem("username") === null)
	}

	// Handling click on side menu
	handleSideMenuClick(selectedKey) {
		this.setState({
			activeKey: selectedKey
		})
	}

	render() {
		// Routing to login page if user is not logged in
		if (!this.isLoggedIn()) {
			window.location.href = "http://127.0.0.1:8088/login"
		}
		let type = localStorage.getItem("type");
		const content = (activeKey) => {
			switch (activeKey) {
				case 0:
					return <PointList />
				// case 1:
				// 	return <Feedback />
				case 2:
					return <Semester />
			}
		}
		if (this.isLoggedIn()) {
			return (
				<div>
					<Navigation />
					<Row>
						<Col sm={3} className="sideMenu" id="sideMenu">
							<Nav stacked bsStyle="pills" activeKey={this.state.activeKey} onSelect={this.handleSideMenuClick}>
								<NavItem eventKey={0}>
									Điểm rèn luyện
								</NavItem>
								{/* <NavItem eventKey={1}>
									Phản hồi
								</NavItem> */}
								{(type === "Employee") ? <NavItem eventKey={2}>Học kỳ</NavItem> : <NavItem disabled />}
							</Nav>
						</Col>

						<Col sm={9}>
							{content(this.state.activeKey)}
						</Col>
					</Row>

				</div>
			);
		} else {
			return (
				<div></div>
			)
		}
	}
}

export default Dashboard;