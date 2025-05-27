import React, { useState, useEffect, use } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/dashboard';
import EmployeeList from './components/employeelist';
import ManageEmployee from './components/Manageemployee';
import Navbar from './components/navbar';
import { getEmployeeList } from './api';
import Login from './components/login';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

import './App.css'; // Assuming you have some styles in App.css

export default function App() {
  const [employeeList, setEmployeeList] = useState([]);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
    const token= localStorage.getItem("token");
    if (token) {
      try{
        const decodedToken =jwtDecode(token);
        const currentTime=Date.now()/1000; // Convert to seconds from milliseconds
        if (decodedToken.exp > currentTime) {
            setIsAuthenticated(true);
        }
        else{
          // Token has expired
          localStorage.removeItem("token");
          setIsAuthenticated(false);
          return;
        }
      }
      catch(err){
        console.error("Error decoding token:", err);
        localStorage.removeItem("token");
        setIsAuthenticated(false);  
        return;
      }
      
    } else {
      setIsAuthenticated(false);
    }},[]);

  useEffect(() => {
    isAuthenticated &&
    fetchData();
  }, [isAuthenticated]);

  return (
    <Router>
      {isAuthenticated && <Navbar setIsAuthenticated={setIsAuthenticated} />}
      <Routes>
        <Route path="/" element={isAuthenticated ? (<Navigate to="/dashboard" replace />) : (<Login setIsAuthenticated={setIsAuthenticated} />)} />
        <Route path="/Dashboard" element={isAuthenticated? <Dashboard employeeList={employeeList} /> : <Navigate to="/" replace/>} />
        <Route path="/employee-list" element={isAuthenticated?<EmployeeList employeeList={employeeList} fetchData={fetchData} error={error} /> :<Navigate to="/" replace/>} />
        <Route path="/manage-employee" element={isAuthenticated ? <ManageEmployee  fetchData={fetchData}/>:<Navigate to="/" replace/>} />
      </Routes>
    </Router>
  );
}