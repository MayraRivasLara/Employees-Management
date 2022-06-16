DROP DATABASE IF EXISTS employees_management_db;
CREATE DATABASE employees_management_db;

USE employees_management_db;

-- Create table departments
CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id));


-- Create table roles 
CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(255),
  department_id INT,
  salary DECIMAL NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES departments (id)
  );


--   Create table employees 
CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id)
    REFERENCES roles (id)
    FOREIGN KEY (manager_id) REFERENCES employees(id)
    ON DELETE SET NULL
  );