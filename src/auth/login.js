import React, { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import auth from './auth'

export const Login = () => {
	// User information hook
	const [email, setEmail] = useState('admin@mail.com')
	const [password, setPassword] = useState('password')
	const [error, setError] = useState('')

	// Function to call submit
	const callSubmit = async e => {
		// Prevents page reload on wrongs creds
		e.preventDefault()
		setError('')
		try {
			const data = await auth.login(email, password)
			// Executes only when there are no 400 and 500 errors, else they are thrown as errors
			// Callbacks can be added here
			if (data) {
				window.location.reload()
			}
		} catch (err) {
			if (err instanceof Error) {
				// Handle errors thrown from frontend
				setError(err.message)
			} else {
				// Handle errors thrown from backend
				if (err === 'LOGIN_BAD_CREDENTIALS') {
					setError('Incorrect credentials')
				} else {
					setError('Error occured in the API.')
				}
			}
		}
	}

	return (
		<>
			<h2>Login</h2>
			<Form onSubmit={callSubmit}>
				<Form.Group controlId='formLoginEmail'>
					<Form.Label>Email</Form.Label>
					<Form.Control type='email' placeholder='Enter email' value={email} onChange={e => setEmail(e.currentTarget.value)} />
				</Form.Group>
				<Form.Group controlId='formLoginPassword'>
					<Form.Label>Password</Form.Label>
					<Form.Control type='password' placeholder='Enter password' value={password} onChange={p => setPassword(p.currentTarget.value)} />
				</Form.Group>
				<Alert variant='danger' style={error !== '' ? { display: 'block' } : { display: 'none' }}>
					{error}
				</Alert>
				<Button variant='primary' type='submit' className='mt-3'>
					Log In
				</Button>
			</Form>
		</>
	)
}
