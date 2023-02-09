import React, { useState, useEffect } from 'react'
import { Navbar, Container, Row, Col, Alert, Button, Spinner } from 'react-bootstrap'
import { FaUserCircle } from 'react-icons/fa'
import auth from '../auth/auth'
import Search from '../auth/search'
import { DataTable } from '../auth/datatable'
import CustomerForm from '../auth/customer-form'

export const Home = props => {
	// User information hook
	const [alert, setAlert] = useState([])
	const [user, setUser] = useState({ name: 'ok' })
	const [customer, setCustomer] = useState({})
	const [customers, setCustomers] = useState([])
	const [loading, setLoading] = useState(true)
	const [sortData, setSortData] = useState({
		sortBy: 'name',
		descending: false
	})

	// Table headers
	const headers = {
		name: 'Name',
		address: 'Address',
		mobile_no: 'Mobile',
		email: 'Email',
		gender: 'Gender',
		action: 'Actions'
	}

	// Fetch user information on page load
	useEffect(() => {
		const fetchData = async () => {
			if (auth.isAuthenticated()) {
				// Get current loggedIn user
				const user = await auth.getUser()
				setUser(user)

				// Get customers
				getCustomers()
			}
		}
		fetchData()
		// eslint-disable-next-line
	}, [])

	// Function to call logout
	const callLogout = async () => {
		auth.logout(() => {
			window.location.reload()
		})
	}
	// Search form
	const getCustomers = async params => {
		setLoading(true)
		const customers = await auth.getCustomers({
			rowsPerPage: 10,
			page: 1,
			...sortData,
			...params
		})
		setCustomers(customers.data)
		setLoading(false)
	}

	// Sorting
	const setSortCallback = params => {
		setSortData(params)
		getCustomers()
	}

	const createOrModifyCustomer = async form => {
		let response = {}
		if (form.isNew) {
			response = await auth.createCustomer(form)
		} else {
			response = await auth.updateCustomer(form)
		}
		if (response.status === 200 || response.status === 201) {
			getCustomers()
		}
		setAlert(response.data.messages)
	}

	const deleteCustomer = async rowId => {
		const response = await auth.deleteCustomer(rowId)
		if (response.status === 200) {
			getCustomers()
		}
		setAlert(response.data.messages)
	}

	const editData = async row => {
		setCustomer(row)
	}

	return (
		<>
			<Navbar className='align-middle justify-content-between' bg='dark' variant='dark'>
				<div>
					<Navbar.Brand href='/'>
						<img alt='' src='/logo192.png' width='40' height='40' className='d-inline-block mx-2' />
						<Navbar.Brand>
							<strong>Project</strong>
						</Navbar.Brand>
					</Navbar.Brand>
				</div>
				<div>
					<label className='ml-4 text-white' style={{}}>
						<FaUserCircle size={21} />
					</label>
					<label className='mx-2 text-white'>{user.name} </label>
					<Button className='mx-2' variant='outline-danger' onClick={callLogout}>
						Log Out
					</Button>
				</div>
			</Navbar>
			<Container className='mt-4'>
				<Row>
					<Col className='mt-4'>
						{alert.map((o, i) => {
							return (
								<Alert key={i} variant={'success'}>
									{o}
								</Alert>
							)
						})}
					</Col>
				</Row>
				<Row>
					<Col className='mt-4'>
						<h2>Welcome {user.firstName}!</h2>
						<Alert variant={'primary'}>You have been successfully authenticated.</Alert>
					</Col>
				</Row>
				<Row className='my-2'>
					<Col>
						<Search callback={getCustomers} />
					</Col>
				</Row>
				<Row className='my-4'>
					<Col>
						<CustomerForm onSubmit={createOrModifyCustomer} customer={customer} />
					</Col>
				</Row>
				<Row>
					<Col>{loading ? <Spinner animation='border' variant='primary' /> : <DataTable tableData={customers} headers={headers} sortData={sortData} onSort={setSortCallback} onDelete={deleteCustomer} onEdit={editData} />}</Col>
				</Row>
			</Container>
		</>
	)
}
