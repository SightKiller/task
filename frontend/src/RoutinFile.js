// src/RoutinFile.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import { useAuth } from './context/AuthContext';
import Admin from './pages/Admin';
import LoginLayout from './components/LoginLayout';
import CreateEmployee from './forms/CreateEmployee';
import UpdateEmployee from './forms/UpdateEmployee';
import EmployeeList from './pages/EmployeeList';

const RoutinFile = () => {
  const { isLoggedIn } = useAuth();

  return (
    <>
      {isLoggedIn && <Header />}
      <Routes>
        <Route path="/" element={<LoginLayout />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/create_employee" element={<CreateEmployee />} />
        <Route path="/update_employee" element={<UpdateEmployee />} />
        <Route path="/employee_list" element={<EmployeeList />} />
      </Routes>
    </>
  );
};

export default RoutinFile;

