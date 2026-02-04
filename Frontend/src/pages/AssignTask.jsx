import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Select, Card, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

const AssignTask = () => {
    const [employees, setEmployees] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [form] = Form.useForm()

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const res = await api.get('/users')
                const filtered = res.data.data.filter(u => u.role === 'Employee')
                setEmployees(filtered)
            } catch (err) {
                message.error('Failed to fetch employees')
            }
        }
        fetchEmployees()
    }, [])

    const onFinish = async (values) => {
        setLoading(true)
        try {
            await api.post('/tasks', values)
            message.success('Task assigned successfully')
            navigate('/dashboard')
        } catch (err) {
            message.error(err.response?.data?.message || 'Failed to assign task')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Card title="Assign New Task" style={{ width: 500 }}>
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        name="title"
                        label="Task Title"
                        rules={[{ required: true, message: 'Please enter task title' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: 'Please enter description' }]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item
                        name="assignedTo"
                        label="Assign To Employee"
                        rules={[{ required: true, message: 'Please select an employee' }]}
                    >
                        <Select placeholder="Select an employee">
                            {employees.map(emp => (
                                <Select.Option key={emp._id} value={emp._id}>
                                    {emp.name} ({emp.email})
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} block>
                            Create & Assign Task
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default AssignTask
