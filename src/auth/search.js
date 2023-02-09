import React, { useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'

export default props => {
	const [name, setName] = useState('')
	const [mobile_no, setMobile] = useState('')
	const [email, setEmail] = useState('')
	const [gender, setGender] = useState('')

	const callSubmit = e => {
		e.preventDefault()
		props.callback({
			email,
			name,
			mobile_no,
			gender
		})
	}
	const callReset = e => {
		e.preventDefault()
		props.callback()
		e.target.reset()
		setName('')
		setMobile('')
		setEmail('')
	}
	return (
		<>
			<Form onSubmit={callSubmit} onReset={callReset}>
				<Row>
					<Col>
						<Form.Group>
							<Form.Control type='text' placeholder='Search name' value={name} onChange={e => setName(e.currentTarget.value)} />
						</Form.Group>
					</Col>
					<Col>
						<Form.Group>
							<Form.Control type='text' placeholder='Search mobile' value={mobile_no} onChange={e => setMobile(e.currentTarget.value)} />
						</Form.Group>
					</Col>
					<Col>
						<Form.Group>
							<Form.Control type='email' placeholder='Search email' value={email} onChange={e => setEmail(e.currentTarget.value)} />
						</Form.Group>
					</Col>
					<Col>
						<Form.Group>
							<Form.Select value={gender} onChange={e => setGender(e.currentTarget.value)}>
								<option value='' disabled>
									Choose gender
								</option>
								<option value='Male'>Male</option>
								<option value='Female'>Female</option>
							</Form.Select>
						</Form.Group>
					</Col>
					<Col>
						<Button variant='primary' type='submit'>
							Search
						</Button>
						<Button variant='danger' type='reset' className='ms-1'>
							Reset
						</Button>
					</Col>
				</Row>
			</Form>
		</>
	)
}
