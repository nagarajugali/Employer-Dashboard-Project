import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { addEmployee } from "../api";
export default function AddEmployee({fetchData}) {
    const [agree, setAgree] = useState(false);
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
            setNewEmployee({
                 employee_name: "",gender: "",
                 age: "",
                skillset: "",
                experience: "",
                joining_date: "",
                job_role: "",});
            // alert("Employee added successfully");
            fetchData();

        }
        catch(err){
            console.error("Error adding employee:", err);
        }
    };
    return(
        <div className="container bg-dark text-white p-4 rounded">
            <form onSubmit={handleSubmit} className="container mt-3">
  <div className="row justify-content-center">
    <div className="col-md-6">

      {[
        { label: "Employee Name", name: "employee_name", type: "text", placeholder: "Your Name" },
        { label: "Age", name: "age", type: "number", placeholder: "Your Age" },
        { label: "Skillset", name: "skillset", type: "text", placeholder: "Enter skills separated by comma" },
        { label: "Experience", name: "experience", type: "number", placeholder: "Years of experience" },
        { label: "Joining Date", name: "joining_date", type: "date", placeholder: "" },
        { label: "Job Role", name: "job_role", type: "text", placeholder: "Job role" },
      ].map(({ label, name, type, placeholder }) => (
        <div className="form-group row" key={name}>
          <label htmlFor={name} className="col-md-4 col-form-label fornt-weight-bold">
            {label}:
          </label>
          <div className="col-md-6 mb-3">
            <input
              type={type}
              className="form-control"
              id={name}
              name={name}
              value={newemployee[name]}
              placeholder={placeholder}
              onChange={handlechange}
              required
            />
          </div>
        </div>
      ))}
      <div className="row mb-3">
        <label htmlFor="gender" className="col-md-4 col-form-label font-weight-bold">gender:</label>
        <div className="col-md-6">
        <select className="form-control" value={newemployee.gender} onChange={handlechange} id="gender" name="gender">
          <option selected>SELECT YOUR GENDER</option>
          <option value="male">MALE</option>
          <option value="female">FEMALE</option>
          <option value="other">OTHER</option>
        </select>
      </div>
      </div>
     
     {/* adding checkbox to add employee . */}
     <div className="form-check ">
      <input className="form-check-input" type="checkbox" id="agree" name="agree" checked={agree} onChange={(e)=>setAgree(e.target.checked) } required/>
      <label className="form-check-label" htmlFor="agree"> 
        I agree to add this employee
      </label>
    </div>
      {/* submit button */}

      <div className="text-center mt-4">
        <button type="submit" className="btn btn-primary px-4" disabled={!agree}>SUBMIT</button>
      </div>

    </div>
  </div>
</form>
            
        </div>
    );
}