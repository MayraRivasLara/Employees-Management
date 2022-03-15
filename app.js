const inquirer = require('inquirer');
const connectDatabase = require("./database/connect");
const mysql2 = require('mysql2');
const fs = require('fs');
require ('console.table');

// Calling functions from departments.js
const { getDepartments, 
        createDepartment, 
        deleteAllDepartments,
        } = require('./src/db-operations/departments');

// Calling functions from roles.js
const { createRole, 
        getRoles 
      } = require('./src/roles');

// Calling functions from employees.js
const { createEmployee, 
        getEmployees,
        updateEmployeeRole, 
        } = require('./src/employees');


// Initiate questions with inquirer
function mainMenu() {
  return inquirer.prompt([{
    message: 'What would you like to do?',
    type: 'list',
    choices: [
      'View all departments', 
      'Add department', 
      'View all roles', 
      'Add role',
      'View all employees', 
      'Add employee', 
      'Update employee role',
      'Exit',
    ],
    name: 'options'
    // Getting users answer.
  }]).then(async (answer) => {
    
    if (answer.option === 'Exit') {
      
      // End process - exit the terminal
      process.exit(0)
    };
         
      // If user chooses = 'view all departments', display table.
    if (answer.option === 'View All Departments') {
      console.table(await getDepartments());
    };


    // If user chooses = 'add a department' initiate the relevant questions.
    // once the user supplied the department name, the dept will be added to db
    if (answer.option === 'Add Department') {
      //Use function to display table
      await askToCreateDepartment();  
    };
    
    // If user chooses = 'View roles' show table
    // display formatted table - job title, role id, the department that role belongs to, and the salary for that role.
    if (answer.option === 'View all roles') {
       //Use function to display table
       console.table(getRoles());
    }

    // If user chooses = 'Add role' 
    // app will prompt user to enter the name, salary, and department for the role and that role is added to the database - fk
    if (answer.option === 'Add role') {
      await createRole(); 
    };

    // If user chooses = 'View all employees' show table
    //display table - employees ids, first names, last names, job titles, departments, salaries, and manager.
    if (answer.option === 'View all employees') {
      console.table(getEmployees());
    };

    //add an employee
    //app will prompt user to provide the relevant details
    // add to the data base 
    if (answer.option === 'Add employee') {
      await createEmployee();
    };
 
    // update an employee role - app will prompt to select the employee to update and the new role.
    // app will update the employee role base on user selection.
    if (answer.option === 'Update employee role') {
      await updateEmployeeRole();
   };
    
   // initiate inquirer questions again.
    mainMenu();
  
  }
  )}

  mainMenu();
     