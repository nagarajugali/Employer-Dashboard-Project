// this component is used to display the list of employees in the company and delete the employee from the list
import React from "react";
import { useState } from "react";
import { useEffect } from "react"; 
import { deleteEmployee } from "../api";
export default function EmployeeList({employeeList,fetchData,error}) {
   const [filteredEmployee,setFilteredEmployee]=useState(employeeList);
   const [ageFilter,setAgeFiter]=useState("all");
   const [genderFilter,setGenderFilter]=useState("all");
   const [skillFilter,setSkillFilter]=useState("all");
   const [roleFilter,setRoleFilter]=useState("all");
   const [expFilter,setExpFilter]=useState("all");
   const [joiningYearfilter,setJoiningYearFilter]=useState("all");
   const [pageno,setPageNo]=useState(1)
    const [employeeName,setEmployeeName]=useState("");
   const recordsperpage=5;
// Adding filters to the employeelist 
    const  FilterEmployees=(()=>{
    let filtered =[...employeeList];
    if (ageFilter!=="all"){
      filtered=filtered.filter((emp)=>{
      if (ageFilter==="under 30") return emp.age<=30;
      if (ageFilter === "30to50") return emp.age >= 30 && emp.age <= 50;
      if (ageFilter === "above50") return emp.age > 50;

      return true;}
      )
    
    }
    if (genderFilter!=="all"){
      filtered=filtered.filter((emp)=>{
        if (genderFilter === "male") return emp.gender.toLowerCase()==="male";
        if (genderFilter === "female") return emp.gender.toLowerCase()==="female";
        if (genderFilter ==="other") return emp.gender.toLowerCase()==="other";
        return true;
       })
    }
    if (roleFilter!=="all" &&roleFilter!==""){
      filtered=filtered.filter((emp)=> 
        emp.job_role.toLowerCase().includes(roleFilter.toLowerCase())
      );
     

    }
    if (skillFilter!=="all" && skillFilter!==""){
      filtered=filtered.filter((emp)=>
      emp.skillset.toLowerCase().includes(skillFilter.toLowerCase()));
      
    }
    if (expFilter!=="all"){
      filtered=filtered.filter((emp)=>{
      if(expFilter==="0to2 years") return emp.experience<=2;
      if(expFilter==="3to5 years") return emp.experience<=5 && emp.experience>2;
      if(expFilter==="6+ years") return emp.experience>5;
    
      }

    )
    }
    if (joiningYearfilter!=="all" && joiningYearfilter!==""){
      filtered=filtered.filter((emp)=>
        parseInt(joiningYearfilter)===new Date(emp.joining_date).getFullYear());
    }
    if (employeeName)
    {
      filtered=filtered.filter((emp)=>
      emp.employee_name.toLowerCase().includes((employeeName).toLowerCase()));
    }
    setFilteredEmployee(filtered);
    setPageNo(1); //resetting to page 1 when filters change
}
)

useEffect(()=>{
  FilterEmployees(); // Call the filter function whenever the employeeList or any filter changes
},[employeeList, ageFilter, joiningYearfilter,roleFilter, genderFilter, expFilter, skillFilter]);

   
    const handleDelete = async (employeeId) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
      if (!confirmDelete) return; // if user cancels, do nothing
        try { 
            await deleteEmployee(employeeId);
             fetchData();
        }
        catch (err) {
            console.error("Error deleting employee:", err);
        }
    };

    // Pagination logic
    const totalRecords = filteredEmployee.length;
    const totalPages = Math.ceil(totalRecords / recordsperpage);
    const startIndex = (pageno - 1) * recordsperpage;   
    const endIndex = startIndex + recordsperpage;
    const paginatedEmployees = filteredEmployee.slice(startIndex, endIndex);

    return(
        <div className="text-white">

          
          <div className="container-fluid  mt-4">
          <button className="btn btn-secondary mb-3" type="button" data-bs-toggle="collapse" data-bs-target="#filterSection" aria-expanded="false" aria-controls="filterSection">
             Show/Hide Filters
            </button>
          
          <div className=" collapse" id="filterSection">
            <div className="card bg-dark card-body">
              <div className="row mb-3">
            <div className="col-md-2 ">
              <label className="form-label">Filter by Age</label> 
              <select className="form-select" value={ageFilter} onChange={(e)=>setAgeFiter(e.target.value)} >
                <option value="all" >all</option>
                <option value="under 30">under 30</option>
                <option value="30to50"> 30-50</option>
                <option value="above50">above50</option>
              </select>

          </div>
          <div className="col-md-2">
          <label className="form-label">Filter by Gender</label>
          <select
            className="form-select"
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          </div>
          <div className="col-md-2">
          <label className="form-label">Filter by Experience</label>
          <select
            className="form-select"
            value={expFilter}
            onChange={(e) => setExpFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="0to2 years">0–2 years</option>
            <option value="3to5 years">3–5 years</option>
            <option value="6+ years">6+ years</option>
          </select>
        </div>
        <div className="col-md-2">
          <label className="form-label">Filter by Role</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. frontend, backend"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <label className="form-label">Filter by Skill</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. React, Python"
            value={skillFilter}
            onChange={(e) => setSkillFilter(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Filter by JoiningDate</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. 2021"
            value={joiningYearfilter}
            onChange={(e) => setJoiningYearFilter(e.target.value)}
          />
        </div>
        </div>
            </div>

            </div>
           
          </div>

            <h1>List of employees in company </h1>
            {error && <p style={{color:"red"}}>{error}</p>}
            {filteredEmployee.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-dark table-bordered table-hover table-striped">
            <thead className="table-columns">
              <tr>
                <th>Name</th>
                  <th>Gender</th>
                  <th>Age</th>
                  <th>Skillset</th>
                  <th>Experience</th>
                  <th>Joining Date</th>
                  <th>Role</th>
                  <th>Action</th>
              </tr>
            </thead>
            <tbody>
               {paginatedEmployees.map((emp) => (
                <tr key={emp.employee_id}>
                  <td>{emp.employee_name}</td>
                  <td>{emp.gender}</td>
                  <td>{emp.age}</td>
                  <td>{emp.skillset}</td>
                  <td>{emp.experience} yrs</td>
                  <td>{emp.joining_date}</td>
                  <td>{emp.job_role}</td>
                  <td>
                    <button className="btn btn-danger" onClick={()=>handleDelete(emp.employee_id)}>Delete</button>
                  </td>
                </tr>))}
            </tbody>
          </table>
          {/* pagination jsx */}
         <nav>
  <ul className="pagination justify-content-center">

    {/* Previous Button */}
    <li className={`page-item ${pageno === 1 ? "disabled" : ""}`}>
      <button
        className="page-link btn btn-primary"
        onClick={() => setPageNo(pageno - 1)}
        disabled={pageno === 1}
      >
        Previous
      </button>
    </li>

    {/* Page Numbers */}
    {Array.from({ length: totalPages }, (_, index) => (
      <li
        key={index}
        className={`page-item ${pageno === index + 1 ? "active" : ""}`}
      >
        <button
          className="page-link"
          onClick={() => setPageNo(index + 1)}
        >
          {index + 1}
        </button>
      </li>
    ))}

    {/* Next Button */}
    <li className={`page-item ${pageno === totalPages ? "disabled" : ""}`}>
      <button
        className="page-link"
        onClick={() => setPageNo(pageno + 1)}
        disabled={pageno === totalPages}
      >
        Next
      </button>
    </li>

  </ul>
</nav>
          </div>
        
          
            
      )}

        </div>
        
    );

}