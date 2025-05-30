--- create a database

create database if not exists employee_db;
use employee_db;

---create table employee

CREATE TABLE employee (
    employee_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    employee_name VARCHAR(100),
    age INT,
    gender ENUM('male', 'female', 'other') NOT NULL,
    skillset VARCHAR(1000),
    experience INT,
    joining_date DATE,
    job_role VARCHAR(50),
);


--- login table
CREATE TABLE IF NOT EXISTS users (
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL
);


--sample data
INSERT INTO employee (employee_name, age, gender, skillset, experience, joining_date, job_role) VALUES
('Alice Johnson', 30, 'female', 'Python, SQL, React', 5, '2020-06-15', 'Software Engineer'),
('Bob Smith', 28, 'male', 'Java, Spring Boot, MySQL', 4, '2019-09-01', 'Backend Developer');


