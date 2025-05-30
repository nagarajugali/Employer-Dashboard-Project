# 🧑‍💻 Employer Dashboard Project

A full-stack web application to manage and monitor employee data efficiently. The dashboard allows employers to add, view, filter, and delete employee records with a responsive UI.

---

## Features

- Filter employees by age, gender, skills, experience, joining year, and role
-  Add and delete employees with real-time updates
-  Pagination for easy data navigation
-  Admin authentication (username/password)
-  Backend built with Tornado (Python) + MySQL
-  REST API endpoints for data operations

----

## 🛠 Tech Stack

| Frontend  | Backend  | Database | Styling   | API Calls   |
|-----------|----------|----------|-----------|-------------|
| React.js  | Tornado  | MySQL    | Bootstrap | axios       |

---



---
# API Endpoints
- GET /employee - Get all employees

- POST /employee/add - Add new employee

- DELETE /employee/<id> - Delete employee by ID
---
 ``` yamlfile 
---

## 📦 Installation Guide

### Prerequisites

- Python 3.x
- Node.js + npm
- MySQL installed locally

```
-----
``` bash
### 1. Clone the repository

git clone https://github.com/nagarajugali/Employer-Dashboard-Project.git
cd Employer-Dashboard-Project

cd backend
pip install -r requirements.txt

Create database and tables using the queries given in employee_queries.sql
```
## Run backend server 
``` bash
cd backend
python main.py
```
## Frontend setup 

```bash
cd frontend
npm install     (this will install all the dependencies in package.json )
npm start

```
## 🔌 API Endpoints

| Method | Endpoint            | Description              |
|--------|---------------------|--------------------------|
| GET    | `/employee`         | Get all employee records |
| POST   | `/employee/add`     | Add a new employee       |
| DELETE | `/employee/<id>`    | Delete employee by ID    |





