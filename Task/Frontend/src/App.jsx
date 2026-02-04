import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import Dashboard from './pages/Dashboard'
import AssignTask from './pages/AssignTask'
import CreateUser from './pages/CreateUser'
import Login from './pages/Login'
import NotFoundPage from './pages/NotFoundPage'


import ProtectedRoute from './routes/ProtectedRoute'
import './App.css'

const { Header, Content } = Layout

function App() {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={['Manager']} />}>
            <Route path="/assign-task" element={<AssignTask />} />
            <Route path="/create-user" element={<CreateUser />} />
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
