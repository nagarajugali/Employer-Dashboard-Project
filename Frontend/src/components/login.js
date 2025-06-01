import React,{useState} from 'react'
import { LoginHandler } from '../api';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

export default function Login({setIsAuthenticated}) {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate= useNavigate();
    const handleUsernameChange = (e) => {
        setUserName(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleloginsubmit =async (e)=>{
        e.preventDefault();
        try{
            const response=await LoginHandler(username,password);
            console.log("Login successful");
            const token = response.data.token;
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000; // Convert to seconds from milliseconds
            const expiretime = (decodedToken.exp - currentTime) * 1000; // Convert to milliseconds
            //auto logout after token expiry
            setTimeout(()=>{
                localStorage.removeItem("token");
                setIsAuthenticated(false);
                navigate("/"); // Redirect to login page after token expiry
            }, expiretime);
            setUserName("");
            setPassword("");
            setIsAuthenticated(true);
            localStorage.setItem("token", response.data.token); // Store the jwt token in local storage
            navigate("/Dashboard"); // Redirect to the dashboard after successful login

            // Redirect to dashboard or perform any other action  
        }
        catch(err){
            alert("Login failed:", err);
            // Handle login error (e.g., show an error message)
        }
        
    }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100  bg-dark text-white'>
        <form className=' bg-secondary p-5 rounded shadow ' onSubmit={handleloginsubmit}>
            <h2 className="text-center mb-4 ">EMPLOYER-DASHBOARD</h2>
            <div className='form-group mb-3'>
                    <label htmlFor='username' className='col-md-4 col-form-label font-weight-bold'>UserName:</label>
                        <input type='text' className='form-control' id='username' placeholder='Enter Username' value={username} onChange={handleUsernameChange} />
                    
            </div>
            <div className='form-group mb-4'>
                <label htmlFor='password' className='col-md-4 col-form-label font-weight-bold'>Password:</label>
                    <input type='password' className='form-control' id='password' placeholder='Enter your password' value={password} onChange={handlePasswordChange} />
                    
            </div>
        
                <div className='text-center'>
                    <button type='submit' className='btn btn-primary' >Login</button>
                </div>

    </form>
    </div>
  );
}
