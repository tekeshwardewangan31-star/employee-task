import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import AppHeader from '../components/AppHeader'

const ProtectedRoute = ({ redirectTo = '/', allowedRoles = [] }) => {
  const userDataStr = localStorage.getItem('userData')
  const location = useLocation()

  if (!userDataStr || userDataStr === 'undefined') {
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  const userData = JSON.parse(userDataStr)

  if (allowedRoles.length > 0 && !allowedRoles.includes(userData.role)) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <>
      <AppHeader />
      <div style={{ padding: '24px' }}>
        <Outlet />
      </div>
    </>
  )
}

export default ProtectedRoute
