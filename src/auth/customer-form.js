import React, { useState, useEffect } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'

export default props => {
	const [show, setShow] = useState(false)
	const [name, setName] = useState('')
	const [address, setAddress] = useState('')
	const [mobile_no, setMobile] = useState('')
	const [email, setEmail] = useState('')
	const [gender, setGender] = useState('')
	const [isNew, setIsNew] = useState(true)

	const openModal = () => {
		setIsNew(true)
		setName('')
		setAddress('')
		setMobile('')
		setEmail('')
		setGender('')
		setShow(true)
	}

	// When existing customer needs to be updated
	useEffect(() => {
		if (props.customer.name) {
			setName(props.customer.name)
			setAddress(props.customer.address)
			setMobile(props.customer.mobile_no)
			setEmail(props.customer.email)
			setGender(props.customer.gender)
			setIsNew(false)
			setShow(true)
		}
	}, [props.customer])

	// Save customer data
	const saveModal = async e => {
		e.preventDefault()
		props.onSubmit({
			isNew: isNew,
			id: props.customer.id,
			name,
			address,
			mobile_no,
			email,
			gender
		})
		setShow(false)
	}
	return (
		<>
			{/* Create button */}
			<Button variant='primary' onClick={openModal}>
				Add Customer
			</Button>

			{/* Modal */}
			<Modal show={show} onHide={() => setShow(false)}>
				<Form onSubmit={saveModal}>
					<Modal.Header closeButton>
						<Modal.Title>Customer Form</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form.Group className='my-3' controlId='name'>
							<Form.Control type='text' placeholder='Enter name' value={name} onChange={e => setName(e.currentTarget.value)} />
						</Form.Group>
						<Form.Group className='my-3' controlId='address'>
							<Form.Control type='text' placeholder='Enter address' value={address} onChange={e => setAddress(e.currentTarget.value)} />
						</Form.Group>
						<Form.Group className='my-3' controlId='mobile'>
							<Form.Control type='text' placeholder='Enter mobile' value={mobile_no} onChange={e => setMobile(e.currentTarget.value)} />
						</Form.Group>
						<Form.Group className='my-3' controlId='email'>
							<Form.Control type='email' placeholder='Enter email' value={email} onChange={e => setEmail(e.currentTarget.value)} />
						</Form.Group>
						<Form.Group className='my-3'>
							<Form.Select value={gender} onChange={e => setGender(e.currentTarget.value)}>
								<option value='' disabled>
									Choose gender
								</option>
								<option value='Male'>Male</option>
								<option value='Female'>Female</option>
							</Form.Select>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant='secondary' onClick={() => setShow(false)}>
							Close
						</Button>
						<Button variant='primary' type='submit' onClick={saveModal} disabled={!name && !address && !mobile_no && !email && !gender}>
							Save Changes
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	)
}
