import { Table, Button, Modal } from 'react-bootstrap'
import React, { useState } from 'react'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'

export const DataTable = ({ tableData, headers, sortData, onSort, onDelete, onEdit }) => {
	const [modalShow, setModalShow] = useState(false)
	const [row, setRow] = useState({})

	/* --- BEGIN SORT HANDLERS/COMPONENTs --- */
	const handleSortClick = async key => {
		const filter = () => {
			if (sortData.sortBy === key) {
				return {
					sortBy: key,
					descending: sortData.descending === false ? true : false
				}
			}
			return {
				sortBy: key,
				descending: false
			}
		}
		onSort(filter())
	}

	const SortControl = () => {
		switch (sortData.descending) {
			case true:
				return <FaAngleDown />
			case false:
				return <FaAngleUp />
			default:
				return <FaAngleUp />
		}
	}
	/* --- END SORT HANDLERS/COMPONENTs --- */

	/* --- BEGIN COLUMN HEADER COMPONENT --- */
	const ColumnHeaders = () => {
		return Object.keys(headers).map((key, index) => {
			return (
				<th style={{ cursor: 'pointer' }} scope='col' key={`header-${index}`} onClick={() => handleSortClick(key)}>
					<span className='pr-2'>{headers[key]}</span>
					{<SortControl />}
				</th>
			)
		})
	}
	/* --- END COLUMN HEADER COMPONENT --- */
	const editRow = row => {
		onEdit(row)
	}
	const deleteRow = row => {
		setRow(row)
		setModalShow(true)
	}
	const confirmDelete = () => {
		onDelete(row.id)
	}
	const declineDelete = () => {
		setRow({})
		setModalShow(false)
	}

	return (
		<>
			<Modal show={modalShow} onHide={() => declineDelete()} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
				<Modal.Header closeButton>
					<Modal.Title id='contained-modal-title-vcenter'>Confirm deletion</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>Are you sure, you wants to delete this customer data?</p>
					<p>Name: {row.name}</p>
					<p>Address: {row.address}</p>
					<p>Mobile: {row.mobile_no}</p>
					<p>Email: {row.email}</p>
					<p>Gender: {row.gender}</p>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='default' onClick={() => declineDelete()}>
						Close
					</Button>
					<Button variant='danger' onClick={() => confirmDelete()}>
						Confirm
					</Button>
				</Modal.Footer>
			</Modal>
			<Table striped bordered hover>
				<thead>
					<tr>
						<ColumnHeaders />
					</tr>
				</thead>
				<tbody>
					{tableData
						? tableData.map((rowData, rowIndex) => {
								return (
									<tr key={`tr-data-${rowIndex}`}>
										<td>{rowData.name}</td>
										<td>{rowData.address}</td>
										<td>{rowData.mobile_no}</td>
										<td>{rowData.email}</td>
										<td>{rowData.gender}</td>
										<td>
											<Button variant='primary' onClick={() => editRow(rowData)}>
												Edit
											</Button>
											<Button variant='danger' className='ms-1' onClick={() => deleteRow(rowData)}>
												Delete
											</Button>
										</td>
									</tr>
								)
						  })
						: ''}
					{!tableData && <NoResults />}
				</tbody>
			</Table>
		</>
	)
}

const NoResults = () => {
	return (
		<tr>
			<td colSpan='6' className='no-results-td'>
				No results
			</td>
		</tr>
	)
}
