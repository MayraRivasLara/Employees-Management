const inquirer = require('inquirer');
const express = require('express');
const mysql2 = require('mysql2');
const fs = require('fs');
const { createDepartment } = require('./src/departments');

function ask() {
  return inquirer.prompt([{
    message: 'What would you like to do?',
    type: 'list',
    choices: [
      'Add Employee',
      'Update Employee Role',
      'View all Roles',
      'Add Role',
      'View All Departments',
      'Add Department',
      'View All Employees',
      'Add Employee',
      'Exit',

    ],
    name: 'options'
  }]).then((answers) => {
    
    if (answers.option === 'Exit') {
      process.exit(0);
    };

    if (answers.option === 'View All Departments') {
        const result = getDepartments();
        console.table(result);
    };

    if (answers.option === 'Add Department') {
      await askDepartment();
     
      createDepartment(userInput);
  };

    askUser();

  })
}

// landing page with list of choices to work with departments, employees and roles.

// choices 
// view all departments,
// should show all the departments in a table in the console

// add a department, 
// app will ask the user for the department name
// once the user supplied the department name, the dept will be added to db


// add role
// app will ask the user for the name of the role
// Salary for that role 
// for the department name (foreign key)

// update an employee role
// app will ask to choose the employee that you want to update
// user will select the new role from a list 
// update the employee role base on user selection


//add an employee
//app will ask to provide first name
// last name 
// employees role 
// name of the managers employee's responds to (foreign key)
// add to the data base 




// // create the connection to database
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'employees-management'
//   });