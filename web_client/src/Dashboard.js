import React, { Component } from 'react';
import Navigation from './Navigation';
import { PageHeader, Row, Col, Nav, NavItem, Table } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
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

	isLoggedIn() {
		return !(localStorage.getItem("username") === null)
	}

	handleSideMenuClick(selectedKey) {
		this.setState({
			activeKey: selectedKey
		})
	}

	render() {
		if (!this.isLoggedIn()) {
			window.location.href = "http://127.0.0.1:8088/login"
		}
		let type = localStorage.getItem("type");
		const content = (activeKey) => {
			switch (activeKey) {
				case 0:
					return <PointList />
				case 1:
					return <Feedback />
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
								<NavItem eventKey={1}>
									Phản hồi
								</NavItem>
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