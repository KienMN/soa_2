import React, {Component} from 'react'
import {Form, FormGroup, Col, Button, ControlLabel, FormControl, Checkbox} from 'react-bootstrap'

class LoginForm extends Component {
	render() {
		return (
			<Form horizontal>
				<FormGroup controlId="formHorizontalEmail">
					<Col componentClass={ControlLabel} sm={2}>
			      Email
					</Col>
					<Col sm={2}>
						<FormControl type="email" placeholder="Email" />
					</Col>
			  </FormGroup>

			  <FormGroup controlId="formHorizontalPassword">
			    <Col componentClass={ControlLabel} sm={2}>
			      Password
			    </Col>
			    <Col sm={2}>
			      <FormControl type="password" placeholder="Password" />
			    </Col>
			  </FormGroup>

			  <FormGroup>
			    <Col smOffset={2} sm={2}>
			      <Checkbox>Remember me</Checkbox>
			    </Col>
			  </FormGroup>

			  <FormGroup>
			    <Col smOffset={2} sm={2}>
			      <Button type="submit">Sign in</Button>
			    </Col>
			  </FormGroup>
			</Form>
		)
	}
}

export default LoginForm;