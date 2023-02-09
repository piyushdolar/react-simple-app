import React from 'react'
import { Navbar, Container, Row, Col, Alert } from 'react-bootstrap'
import { Login } from '../auth/login'
// import { Register } from '../auth/register'

export const Landing = props => {
	return (
		<>
			<Navbar bg='dark' variant='dark'>
				<Navbar.Brand href='/'>
					<img alt='' src='/logo192.png' width='40' height='40' className='d-inline-block mx-2' />
					<Navbar.Brand>
						<strong>Project</strong>
					</Navbar.Brand>
				</Navbar.Brand>
			</Navbar>
			<Container className='mt-4'>
				<Row>
					<Col className='mt-4'>
						<h2>Hello!</h2>
						<Alert variant={'primary'}>Please, login with default credentials.</Alert>
					</Col>
				</Row>
				<Row>
					<Col lg={6} md={6} sm={12}>
						<Login {...props} />
					</Col>
					{/* <Col lg={6} md={6} sm={12} className='mt-4'>
						<Register {...props} />
					</Col> */}
				</Row>
			</Container>
		</>
	)
}
