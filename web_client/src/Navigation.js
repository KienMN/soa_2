import React, { Component } from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap'

// const homeLink = "http://localhost:3000";

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
  				<Nav>
  					<NavItem href="#"></NavItem>
  				</Nav>
    			<Navbar.Text>
      			Signed in as: <Navbar.Link href="#">Kien Mai Ngoc</Navbar.Link>
    			</Navbar.Text>
    			<Navbar.Text pullRight>Have a great day!</Navbar.Text>
  			</Navbar.Collapse>
			</Navbar>
		)
	}
}

export default Navigation;