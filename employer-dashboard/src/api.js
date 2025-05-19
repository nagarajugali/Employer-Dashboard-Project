import axios from "axios";
const BASE_URL = "http://localhost:8888"; //tornado server
export const getEmployeeList = () => {
    return axios.get(`${BASE_URL}/employee`)
    ;}
export const addEmployee = (employeeData) => {
    return axios.post(`${BASE_URL}/employee/add`, employeeData); 
}
export const deleteEmployee = (employeeId) => {
    return axios.delete(`${BASE_URL}/employee/${employeeId}`);
}