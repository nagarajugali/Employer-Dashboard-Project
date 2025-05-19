import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { addEmployee } from "../api";
export default function AddEmployee(){
    const [newemployee, setNewEmployee] = useState({
        employee_name: "",
        gender: "",
        age: "",
        skillset: "",
        experience: "",
        joining_date: "",
        job_role: "",

    });
    const handlechange=(e)=>{
        setNewEmployee({...newemployee,[e.target.name]:e.target.value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await addEmployee(newemployee);
            console.log("Employee added successfully:");
            alert("Employee added successfully");
        }
        catch(err){
            console.error("Error adding employee:", err);
        }
    };
    return(
        <div>
            <h1>Add Employee</h1>
            <form>
                <label >Employee_name</label>
                <input type='text' name='employee_name' value={newemployee.employee_name} onChange={handlechange} /><br></br>
                <label>Gender</label>
                <input type='text' name='gender' value={newemployee.gender} onChange={handlechange} /> <br></br>
                <label>Age</label>
                <input type='text' name='age' value={newemployee.age} onChange={handlechange} />   <br></br>
                <label>Skillset</label>
                <input type='text' name='skillset' value={newemployee.skillset} onChange={handlechange} /><br></br>
                <label>Experience</label>
                <input type='text' name='experience' value={newemployee.experience} onChange={handlechange} /><br></br>
                <label>Joining_date</label>
                <input type='date' name='joining_date' value={newemployee.joining_date} onChange={handlechange} /> <br></br>
                <label>Job_role</label>
                <input type='text' name='job_role' value={newemployee.job_role} onChange={handlechange} /><br></br>
                <button type="submit" onClick={handleSubmit}>Add Employee</button>
            </form>
            
        </div>
    );
}