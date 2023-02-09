import API from '../api'
const Auth = {
	login: async (email, password) => {
		// Assert email is not empty
		if (!(email.length > 0)) {
			throw new Error('Email was not provided')
		}
		// Assert password is not empty
		if (!(password.length > 0)) {
			throw new Error('Password was not provided')
		}
		// Create data JSON
		const formData = new FormData()
		formData.append('email', email)
		formData.append('password', password)

		// POST request
		const response = await API.post('/auth/login', formData)

		// 500 error handling
		if (response.status === 500) {
			throw new Error('Internal server error')
		}
		// Extracting response data
		// 400 error handling
		if (response.status >= 400 && response.status < 500) {
			throw new Error('Unauthorized')
		}
		// Successful login handling
		if ('token' in response.data) {
			localStorage.setItem('token', response.data['token'])
			localStorage.setItem('user', 'user')
		}
		return response.data
	},

	register: async (firstName, lastName, email, password, passwordConfirmation) => {
		// Assert firstName, lastName and phone not empty
		if (!(firstName.length > 0)) {
			throw new Error('First Name was not provided')
		}
		// Assert firstName, lastName and phone not empty
		if (!(lastName.length > 0)) {
			throw new Error('Last Name was not provided')
		}
		// Assert email is not empty
		if (!(email.length > 0)) {
			throw new Error('Email was not provided')
		}
		// Assert password is not empty
		if (!(password.length > 0)) {
			throw new Error('Password was not provided')
		}
		// Assert password confirmation is not empty
		if (!(passwordConfirmation.length > 0)) {
			throw new Error('Password confirmation was not provided')
		}
		// Assert email or password or password confirmation is not empty
		if (password !== passwordConfirmation) {
			throw new Error('Passwords do not match')
		}
		// Create data JSON
		const formData = {
			email: email,
			password: password,
			firstName: firstName,
			lastName: lastName
		}
		// Create request
		const request = new Request('http://localhost:8000/auth/register', {
			method: 'POST',
			body: JSON.stringify(formData)
		})
		// Fetch request
		const response = await fetch(request)
		// 500 error handling
		if (response.status === 500) {
			throw new Error('Internal server error')
		}
		// 400 error handling
		const data = await response.json()
		if (response.status >= 400 && response.status < 500) {
			if (data.detail) {
				throw data.detail
			}
			throw data
		}
		// Successful login handling
		if ('access_token' in data) {
			// eslint-disable-next-line
			const decodedToken = decodeJwt(data['access_token'])
			// console.log(decodedToken)
			localStorage.setItem('token', data['access_token'])
			localStorage.setItem('permissions', 'user')
		}
		return data
	},

	logout: callback => {
		localStorage.removeItem('token')
		localStorage.removeItem('user')
		// Using a callback to load '/' when logout is called
		callback()
	},

	getUser: async () => {
		const token = localStorage.getItem('token')
		// GET request
		const response = await API.get('/auth/user', {
			headers: { Authorization: `Bearer ${token}` }
		})
		return response.data.user
	},

	getCustomers: async params => {
		const token = localStorage.getItem('token')
		// GET request
		const response = await API.get('/customers/paginate', {
			headers: { Authorization: `Bearer ${token}` },
			params: params
		})
		return response.data
	},

	createCustomer: async form => {
		const token = localStorage.getItem('token')
		const response = await API.post('/customers', form, {
			headers: { Authorization: `Bearer ${token}` }
		})
		return response
	},

	deleteCustomer: async id => {
		const token = localStorage.getItem('token')
		const response = await API.delete(`/customers/${id}`, {
			headers: { Authorization: `Bearer ${token}` }
		})
		return response
	},

	updateCustomer: async form => {
		const token = localStorage.getItem('token')
		const response = await API.patch(`/customers/${form.id}`, form, {
			headers: { Authorization: `Bearer ${token}` }
		})
		return response
	},

	isAuthenticated: () => {
		const user = localStorage.getItem('user')
		if (!user) {
			return false
		}
		return user === 'user' ? true : false
	}
}

export default Auth
