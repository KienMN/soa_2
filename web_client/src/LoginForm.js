import React, { Component } from 'react'
import { Form, FormGroup, Col, Button, ControlLabel, FormControl, Checkbox } from 'react-bootstrap'
import "./LoginForm.css";

class LoginForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			password: ""
		}

		this.handleChange = this.handleChange.bind(this);
		this.validateForm = this.validateForm.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.isLoggedIn = this.isLoggedIn.bind(this);
	}

	validateForm() {
		return this.state.username.length > 0 && this.state.password.length > 0;
	}

	handleChange(e) {
		this.setState({
			[e.target.id]: e.target.value
		})
	}

	isLoggedIn() {
		return !(localStorage.getItem("username") === null)
	}

	handleSubmit(e) {
		e.preventDefault();
		fetch("http://127.0.0.1:3000/api/v1/sign_in", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"username": this.state.username,
				"password": this.state.password
			})
		}).then(res => res.json())
			.then(
				(res) => {
					if (res.code === 0) {
						alert(res.message);
					} else {
						localStorage.setItem("username", res.data.user.username);
						localStorage.setItem("tokenId", res.data.token);
						localStorage.setItem("type", res.data.user.type);
						window.location.href = "http://127.0.0.1:8088/dashboard";
					}
					// console.log(res);
				},
				(err) => {
					alert(err);
					console.log(err);
				})

	}

	render() {
		if (this.isLoggedIn()) {
			window.location.href = "http://127.0.0.1:8088/dashboard";
		}
		if (!this.isLoggedIn()) {
			return (
				<div className="Login">
					<form onSubmit={this.handleSubmit}>
						<FormGroup controlId="username">
							<ControlLabel>
								Username
						</ControlLabel>
							<FormControl
								autoFocus
								type="text"
								value={this.state.username}
								placeholder="Username"
								onChange={this.handleChange}
							/>
						</FormGroup>
						<FormGroup controlId="password">
							<ControlLabel>Password</ControlLabel>
							<FormControl
								type="password"
								value={this.state.password}
								placeholder="Password"
								onChange={this.handleChange}
							/>
						</FormGroup>
						<Button
							block
							bsSize="large"
							bsStyle="primary"
							disabled={!this.validateForm()}
							type="submit"
						>
							Login
					</Button>
					</form>
				</div>
			)
		} else {
			return (
				<div></div>
			)
		}
	}
}

export default LoginForm;