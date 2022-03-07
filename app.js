const inquirer = require('inquirer');
// const express = require('express');
// const mysql2 = require('mysql2');
// const fs = require('fs');
const { getDepartments, createDepartment, deleteAllDepartments} = require('./src/departments');
const { createRole, getRoles } = require('./src/roles');
const { createEmployee, getEmployees, updateEmployeeRole, deleteEmployee,} = require('./src/employees');


// Initiate questions.
function askUser() {
  return inquirer.prompt([{
    message: 'What would you like to do?',
    type: 'list',
    choices: [
      'View all departments', 
      'View all roles', 
      'View all employees', 
      'Add department', 
      'Add role',
      'Add employee', 
      'Update employee role',
      'Exit',
      
    ],
    name: 'options'
  }]).then((answers) => {
    
    if (answers.option === 'Exit') {
      process.exit(0);
    };
    
    // choices 
    // view all departments,
    // should show all the departments in a table in the console
    if (answers.option === 'View All Departments') {
      const result = getDepartments();
      console.table(result);
    };
    
    // add a department, 
    // app will ask the user for the department name
    // once the user supplied the department name, the dept will be added to db
    if (answers.option === 'Add Department') {
      await askDepartment();
     
      createDepartment(userInput);
    };

    askUser()

    // View roles
    if (answers.option === 'View all roles') {
        const result = getRoles();
        console.table(result);
    };    
    
    // add role
    // app will ask the user for the name of the role
    // Salary for that role 
    // for the department name (foreign key)
    if (answers.option === 'Add role')
      await askRoles();
   
    createRole(userInput);
  
    askUser();
    
    if (answers.option === 'View all employees') {
      const result = getEmployees();
      console.table(result);
  };    
    //add an employee
    //app will ask to provide first name
    // last name 
    // employees role 
    // name of the managers employee's responds to (foreign key)
    // add to the data base 
  
    if (answers.option === 'Add employee') {
      await askEmployee();
      
      createEmployee(userInput);
    };
    
    // update an employee role
    // app will ask to choose the employee that you want to update
    // user will select the new role from a list 
    // update the employee role base on user selection
    if (answers.option === 'Update employee role') {

    }
    askUser()
       
  }
  )}


askUser();