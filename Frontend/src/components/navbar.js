import React from 'react';
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
export default function Navbar({setIsAuthenticated}){
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/");
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/"><h4>EMPLOYER DASHBOARD</h4></NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link " aria-current="page" to="/">Dashboard</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/manage-employee">Add Employee</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/employee-list">Employee List</NavLink>
                        </li>
                    </ul>
                    <button onClick={handleLogout} className="btn btn-danger ms-auto">
                    Logout
                </button>
                </div>
                
            </div>
            </nav>
    );
    
}