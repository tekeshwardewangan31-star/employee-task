import React from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Formik } from 'formik'
import { Button, Input, Card, Form } from 'antd'
import api from '../services/api'
import loginValidation from '../validation/loginValidation'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/dashboard'

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 60 }}>
      <Card title="Login" style={{ width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginValidation}
          onSubmit={(values, { setSubmitting }) => {
            api.post('/auth/login', values).then((res) => {
              localStorage.setItem('userData', JSON.stringify(res.data.data))
              setSubmitting(false)
              navigate(from, { replace: true })
            }).catch((err) => {
              console.log(err)
              setSubmitting(false)
              alert(err.response?.data?.message || 'Login failed')
              // Error handled globally by api interceptor
            })
          }}
        >
          {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
            <Form layout="vertical" onFinish={handleSubmit}>
              <Form.Item
                label="Email"
                validateStatus={touched.email && errors.email ? 'error' : ''}
                help={touched.email && errors.email}
              >
                <Input
                  name="email"
                  placeholder="Enter your email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>
              <Form.Item
                label="Password"
                validateStatus={touched.password && errors.password ? 'error' : ''}
                help={touched.password && errors.password}
              >
                <Input.Password
                  name="password"
                  placeholder="Enter your password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block size="large">
                  Login
                </Button>
              </Form.Item>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  )
}

export default Login

