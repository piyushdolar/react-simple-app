import React from 'react'
import { Route, Routes } from 'react-router-dom'
import auth from './auth'
import { Landing } from '../pages/Landing'

// ProtectedRoute template to define any new protected routes
export const ProtectedRoute = ({ component: Component, ...rest }) => {
	let Element = Component
	if (!auth.isAuthenticated()) {
		Element = Landing
	}
	return (
		<Routes>
			<Route {...rest} element={<Element />} />
		</Routes>
	)
}
