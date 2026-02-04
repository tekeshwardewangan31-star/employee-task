import React, { useEffect, useState } from 'react'
import { Table, Tag, Button, Select, message, Card, Space } from 'antd'
import api from '../services/api'

const Dashboard = () => {
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(false)
    const userData = JSON.parse(localStorage.getItem('userData'))

    const fetchTasks = async () => {
        setLoading(true)
        try {
            const res = await api.get('/tasks')
            setTasks(res.data.data)
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to fetch tasks')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTasks()
    }, [])

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            await api.patch(`/tasks/${taskId}/status`, { status: newStatus })
            alert('Status updated successfully')
            fetchTasks()
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to update status')
        }
    }

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Assigned To',
            dataIndex: 'assignedTo',
            key: 'assignedTo',
            render: (user) => user?.name || 'Unassigned',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status, record) => {
                if (userData.role === 'Employee' && record.assignedTo?._id === userData.id) {
                    return (
                        <Select
                            defaultValue={status}
                            style={{ width: 120 }}
                            onChange={(value) => handleStatusChange(record._id, value)}
                            options={[
                                { value: 'Pending', label: 'Pending' },
                                { value: 'In Progress', label: 'In Progress' },
                                { value: 'Completed', label: 'Completed' },
                            ]}
                        />
                    )
                }
                let color = status === 'Completed' ? 'green' : status === 'In Progress' ? 'blue' : 'gold'
                return <Tag color={color}>{status}</Tag>
            },
        },
        {
            title: 'Assigned By',
            dataIndex: 'assignedBy',
            key: 'assignedBy',
            render: (user) => user?.name || 'System',
        },
    ]

    return (
        <Card title="Task Dashboard">
            <Space direction="vertical" style={{ width: '100%' }}>
                <Table
                    columns={columns}
                    dataSource={tasks}
                    rowKey="_id"
                    loading={loading}
                />
            </Space>
        </Card>
    )
}

export default Dashboard
