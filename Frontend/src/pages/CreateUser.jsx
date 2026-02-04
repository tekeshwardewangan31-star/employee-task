import React, { useState } from 'react'
import { Form, Input, Button, Card, message, Select, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Formik } from 'formik'
import api from '../services/api'
import createUserValidation from '../validation/createUserValidation'

const { Text } = Typography

const CreateUser = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (values, { resetForm }) => {
        setLoading(true)
        try {
            await api.post('/users', values)
            navigate('/assign-task')
            resetForm()
            alert('User created successfully')
        } catch (err) {
            // Error is handled globally by api interceptor
            alert(err.response?.data?.message || 'User creation failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
            <Card title="Register New User" style={{ width: 500, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <Formik
                    initialValues={{ name: '', email: '', mobile: '', password: '', role: 'Employee' }}
                    validationSchema={createUserValidation}
                    onSubmit={handleSubmit}
                >
                    {({ handleSubmit, handleChange, handleBlur, values, errors, touched, setFieldValue }) => (
                        <Form layout="vertical" onFinish={handleSubmit}>
                            <Form.Item
                                label="Full Name"
                                validateStatus={touched.name && errors.name ? 'error' : ''}
                                help={touched.name && errors.name}
                            >
                                <Input
                                    name="name"
                                    placeholder="Enter full name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                validateStatus={touched.email && errors.email ? 'error' : ''}
                                help={touched.email && errors.email}
                            >
                                <Input
                                    name="email"
                                    placeholder="Enter email address"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Mobile"
                                validateStatus={touched.mobile && errors.mobile ? 'error' : ''}
                                help={touched.mobile && errors.mobile}
                            >
                                <Input
                                    name="mobile"
                                    placeholder="Enter mobile number"
                                    value={values.mobile}
                                    onBlur={handleBlur}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (value === '' || /^[0-9\b]+$/.test(value)) {
                                            setFieldValue('mobile', value);
                                        }
                                    }}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                validateStatus={touched.password && errors.password ? 'error' : ''}
                                help={touched.password && errors.password}
                            >
                                <Input.Password
                                    name="password"
                                    placeholder="Enter password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Role"
                                validateStatus={touched.role && errors.role ? 'error' : ''}
                                help={touched.role && errors.role}
                            >
                                <Select
                                    value={values.role}
                                    onChange={(value) => setFieldValue('role', value)}
                                    onBlur={() => handleBlur({ target: { name: 'role' } })}
                                >
                                    <Select.Option value="Employee">Employee</Select.Option>
                                </Select>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" loading={loading} block size="large">
                                    Create User
                                </Button>
                            </Form.Item>
                        </Form>
                    )}
                </Formik>
            </Card>
        </div>
    )
}

export default CreateUser

