import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap'

// const homeLink = "http://localhost:3000";
const username = localStorage.getItem("username");

class Navigation extends Component {

	render() {
		return (
			<Navbar inverse collapseOnSelect>
				<Navbar.Header>
					<Navbar.Brand>
						<a href="#home">Đánh giá điểm rèn luyện</a>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Navbar.Text>
						Đăng nhập: <Navbar.Link href="#">{username}</Navbar.Link>
					</Navbar.Text>
					<Nav pullRight>
						<NavItem href="http://127.0.0.1:8088/logout">
							Đăng xuất
						</NavItem>
					</Nav>
					<Navbar.Text pullRight>Chúc một ngày tốt lành!</Navbar.Text>
				</Navbar.Collapse>
			</Navbar>
		)
	}
}

export default Navigation;