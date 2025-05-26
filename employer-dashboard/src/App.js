import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/dashboard';
import EmployeeList from './components/employeelist';
import ManageEmployee from './components/Manageemployee';
import Navbar from './components/navbar';
import { getEmployeeList } from './api';
import './App.css'; // Assuming you have some styles in App.css

export default function App() {
  const [employeeList, setEmployeeList] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await getEmployeeList();
      setEmployeeList(response.data.data);
    } catch (err) {
      console.error("Error fetching employee list:", err);
      setError(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard employeeList={employeeList} />} />
        <Route path="/employee-list" element={<EmployeeList employeeList={employeeList} fetchData={fetchData} error={error} />} />
        <Route path="/manage-employee" element={<ManageEmployee  fetchData={fetchData}/>} />
      </Routes>
    </Router>
  );
}