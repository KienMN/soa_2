import decode from 'jwt-decode'

class AuthService {
	constructor(domain) {
		this.domain = domain || "http://localhost:3000"
		this.fetch = this.fetch.bind(this)
		this.login = this.login.bind(this)
		this.getProfile = this.getProfile.bind(this)
	}

	login(username, password) {
		// Getting token from web server
		return this.fetch(`${this.domain}/login`, {
			method: 'POST',
			body: JSON.stringify(
				username,
				password
			)
		}).then(res => {
			this.setToken(res.token)			// setting the token in local storage
			return Promise.resolve(res);
		})
	}

	loggedIn() {
		// Checking if there is a valid saved token
		const token = this.getToken()		// getting the token from local storage
		return !!token && !this.isTokenExpired(token)
	}

	isTokenExpired(token) {
		try {
			const decode = decode(token)
			if (decode.exp < Date.now() / 1000) {
				return true;
			} else {
				return false;
			}
		} catch(e) {
			return false;
		}
	}

	setToken(idToken) {
		// Saving user token to the local storage
		localStorage.setItem("id_token", idToken)
	}

	getToken(idToken) {
		// Retrieving the user token from local storage
		localStorage.getItem("id_token")
	}

	logout() {
		// Clearing the user token from local storage
		localStorage.removeItem("id_token")
	}

	getProfile() {
		// Using jwt-decode npm package to decode the token
		return decode(this.getToken());
	}

	fetch(url, options) {
		// Performing api calls
		const headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}

		if (this.loggedIn()) {
			headers['Authorization'] = 'Bearer ' + this.getToken()
		}

		return fetch(url, {
			headers,
			...options
		}).then(this._checkStatus)
		.then(res => res.json())
	}

	_checkStatus(response) {
		if (response.status >= 200 && response.status < 300) {
			return response;
		} else {
			let error = new Error(response.statusText);
			error.response = response;
			throw error;
		}
	}
}

export default AuthService;