import React from 'react';
import { Layout, Button, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
const { Header } = Layout;

const AppHeader = () => {
  const navigate = useNavigate();
  const userDataStr = localStorage.getItem('userData');
  let userData = null;
  try {
    userData = JSON.parse(userDataStr);
  } catch (e) { }

  const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate('/', { replace: true });
  };

  return (
    <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ color: '#fff', fontWeight: 700, fontSize: 18, marginRight: 24 }}>
          <Link to="/dashboard" style={{ color: 'inherit' }}>
            EMS Portal
          </Link>
        </div>
        <Space size="large">
          <Link to="/dashboard" style={{ color: '#fff' }}>Dashboard</Link>
          {userData?.role === 'Manager' && (
            <>
              <Link to="/assign-task" style={{ color: '#fff' }}>Assign Task</Link>
              <Link to="/create-user" style={{ color: '#fff' }}>Create User</Link>
            </>
          )}
        </Space>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {userData && (
          <div style={{ color: '#fff' }}>
            <span style={{ opacity: 0.7, marginRight: 8 }}>{userData.role}:</span>
            <strong>{userData.name}</strong>
          </div>
        )}
        <Button onClick={handleLogout} type="primary" danger>
          Logout
        </Button>
      </div>
    </Header>
  );
};

export default AppHeader;
