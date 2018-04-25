import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import PointForm from './PointForm';
import Dashboard from './Dashboard';
import Logout from './Logout';

ReactDOM.render(
	<Router>
		<div>
			<Route exact path="/" component={App} />
			<Route exact path="/login" component={LoginForm} />
			<Route exact path="/logout" component={Logout} />
			<Route exact path="/point" component={PointForm} />
			<Route exact path="/dashboard" component={Dashboard} />
		</div>
	</Router>, 
	document.getElementById('root')
);
registerServiceWorker();
