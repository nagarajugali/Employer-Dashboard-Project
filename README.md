# Employer Dashboard Project

A simple web application to manage employee details including adding, listing, and deleting employees.

---

## Features

- Add new employees with details such as name, gender, age, skillset, experience, joining date, and job role.
- View a list of all employees in the company.
- Delete employees from the list.
- Dashboard that shows no of employees . gender wise , average age , experience .
- Backend APIs built using Python Tornado framework.
- Frontend built using React.js with React Router for navigation.
- axios to get backend API calls.
- MySQL database for storing employee data.

----

## Current Progress

- [x] Backend setup done , created GET,POST,DELETE API calls and connected mysql to toranado .CORS handler done to have communication between react and tornado .
- [x] Setup React frontend with routing  
- [x] Created ManageEmployee component for adding employees  
- [x] Created EmployeeList component for displaying and deleting employees  
- [x] Add update employee feature
- [ ] Dashboard component using react 
- [ ] Improve UI and styling using css and bootstrap
- [ ] Improve Error handling and validation
- [ ] ADD login page ( authentication) to have secure access 



---
# API Endpoints
- GET /employee - Get all employees

- POST /employee/add - Add new employee

- DELETE /employee/<id> - Delete employee by ID

---
