import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import UsersList from './UsersList';
import AdminFeedback from './AdminFeedback';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `admin-tab-${index}`,
    'aria-controls': `admin-tabpanel-${index}`,
  };
}

const AdminLayout = () => {
  const [value, setValue] = useState(0);
  const { user } = useSelector(state => state.auth);

  // Проверка, является ли пользователь администратором
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper elevation={3} sx={{ mb: 2 }}>
        <Typography variant="h4" component="h1" sx={{ p: 2, textAlign: 'center' }}>
          Панель администратора
        </Typography>
        <Tabs 
          value={value} 
          onChange={handleChange} 
          aria-label="admin tabs"
          centered
        >
          <Tab label="Пользователи" {...a11yProps(0)} />
          <Tab label="Обратная связь" {...a11yProps(1)} />
        </Tabs>
      </Paper>

      <TabPanel value={value} index={0}>
        <UsersList />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AdminFeedback />
      </TabPanel>
    </Box>
  );
};

export default AdminLayout;