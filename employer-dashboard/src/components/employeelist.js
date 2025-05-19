// this component is used to display the list of employees in the company and delete the employee from the list
import React from "react";
import { useState } from "react";
import { useEffect } from "react"; 
import { getEmployeeList,deleteEmployee } from "../api";
import { RemoveEmployee } from "./Manageemployee";
export default function EmployeeList(){
    const [employeeList, setEmployeeList] = useState([]);
    const [error,seterror] = useState(null);
    const fetchData = async () => {
            try{
                const response = await getEmployeeList();
                setEmployeeList(response.data.data);
                 
            }
            catch(err){
                console.error("Error fetching employee list:", err);
                seterror(err);
            }};
        
    useEffect(()=>{
        fetchData();
    },[]);
    const handleDelete = async (employeeId) => {
        try {
            await deleteEmployee(employeeId);
            // fetchData();
        }
        catch (err) {
            console.error("Error deleting employee:", err);
        }
    };
    return(
        <div>
            <h1>List of employees in company </h1>
            {error && <p style={{color:"red"}}>{error}</p>}
            {employeeList.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <ul>
          {employeeList.map((emp) => (
            <li key={emp.employee_id}>
              <strong>{emp.employee_name}</strong> | {emp.gender}, {emp.age} yrs |
      Skills: {emp.skillset} | Exp: {emp.experience} yrs | Joined: {emp.joining_date} |
      Role: {emp.job_role}| <button  onClick={()=>handleDelete(emp.employee_id)}>   ❌ </button>
            </li>
          ))}
        </ul>
      )}
            {/* <table> 
                <thead>
                    <tr>
                        <th>Employee_id</th>
                        <th>Employee_name</th>
                        <th>Gender</th>
                        <th>Age</th>
                        <th>Skillset</th>
                        <th>Experience</th>
                        <th>joining_date</th>
                        <th>job_role</th>
                    </tr>
                </thead>
                <tbody>
                    {employeeList.map((employee) => (
                        <tr key={employee.employee_id}>
                            <td>{employee.employee_id}</td>
                            <td>{employee.employee_name}</td>
                            <td>{employee.gender}</td>
                            <td>{employee.age}</td>
                            <td>{employee.skillset}</td>
                            <td>{employee.experience}</td>
                            <td>{employee.joining_date}</td>
                            <td>{employee.job_role}</td>
                        </tr>   ))}
                </tbody>

            </table>*/} 
        </div>
    );
}