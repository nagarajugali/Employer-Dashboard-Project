import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/dashboard';
import  EmployeeList from './components/employeelist';
import ManageEmployee from './components/Manageemployee';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employee-list" element={<EmployeeList />} />
        <Route path="/manage-employee" element={<ManageEmployee />} />
      </Routes>
    </Router>
  );
}