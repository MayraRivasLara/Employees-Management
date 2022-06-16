// // import inquirer
// const inquirer = require('inquirer');
// // import mysql12
// const mysql = require('mysql2');
// // import console.table
// const consoleTable = require("console.table");
// // import connection to database
// const connectDatabase = require("./connect");


    
// // when node server.js is run in the terminal - Inquirer Prompts to update, view and add (employees, roles + departments)
// function questions() {
//     return inquirer.prompt([
//         {
//             type: 'list',
//             name: 'actions',
//             message: 'What would you like to do?',
//             choices: [
//                 'View All Departments',
//                 'View All Roles',
//                 'View All Employees',
//                 'Add New Department',
//                 'Add New Role',
//                 'Add New Employee',
//                 'Update Employee Role',
//                 'Exit']
//         }])
//         .then((answers) => {
//             if (answers.actions === "View All Departments") {
//                 showDepartments();
//             }

//             if (answers.actions === "View All Roles") {
//                 showRoles();
//             }
//             if (answers.actions === "View All Employees") {
//                 showEmployees();
//             }

//             if (answers.actions === "Add New Department") {
//                 addDepartment();
//             }

//             if (answers.actions === "Add New Role") {
//                 addRole();
//             }

//             if (answers.actions === "Add New Employee") {
//                 addEmployee();
//             }

//             if (answers.actions === "Update Employee Role") {
//                 updateEmployee();
//             }
//             if (answers.actions === "Exit") {
//                 exit();
//             }
//         })
// };

// questions()

// // show table functions based on user selection
// function showDepartments() {
//     console.log('Showing all departments...\n');
//     db.query('SELECT * FROM employee_db.departments;', function (err, results) {
//         console.table(results);
//         if (err) {
//             console.log(err);
//         };
//         questions();
//     });
// };

// function showRoles() {
//     console.log('Showing all roles...\n');
//     db.query("SELECT * FROM employee_db.roles;", function (err, results) {
//         console.table(results);
//         if (err) {
//             console.log(err);
//         };
//         questions();
//     })
// };

// function showEmployees() {
//     console.log('Showing all employees...\n'); 
//     db.query('SELECT * FROM employees JOIN roles ON employees.role_id = roles.id;', function (err, results) {
//         console.table(results);
//         if (err) {
//             console.log(err);
//         };
//         questions();
//     })
// };

// function addDepartment() {
//     return inquirer.prompt([
//         {
//             type: "input",
//             name: "newdepartment",
//             message: "What is the name of the new department?"
//         },
//     ])
//         .then((answers) => {
//             db.query("INSERT INTO departments (name) VALUES (?)", [answers.newdepartment], function (err, results) {
//                 if (err) {
//                     console.log(err);
//                 };
//             })
//             console.log('Added ' + answers.newdepartment + " to departments!");
//             questions();
//         })
// };

// function addRole() {
//     db.query('SELECT * FROM employee_db.departments;', function (err, results) {
//         let departmentList = [];
//         results.forEach(result => departmentList.push({ name: result.name, value: result.id }));
//         return inquirer.prompt([
//             {
//                 type: "input",
//                 name: "rolename",
//                 message: "What is the name of the new role?"
//             },
//             {
//                 type: "input",
//                 name: "rolesalary",
//                 message: "What is the salary of the new role?"
//             },
//             {
//                 type: "list",
//                 name: "roledepartment",
//                 message: "What department is the new role in?",
//                 choices: departmentList
//             },
//         ])
//             .then((answers) => {
//                 db.query("INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)", [answers.rolename, answers.rolesalary, answers.roledepartment], function (err, results) {
//                     console.log(err);
//                 })
//                 console.log('Added' + answers.rolename + " to roles!");
//                 questions();
//             })
//     })
// };

// function addEmployee() {
//     db.query('SELECT * FROM employee_db.roles;', function (err, results) {
//         let roleList = [];
//         results.forEach(result => roleList.push({ name: result.title, value: result.id }));
//         return inquirer.prompt([
//             {
//                 type: "input",
//                 name: "employeeFirstname",
//                 message: "What is the employee's first name?"
//             },
//             {
//                 type: "input",
//                 name: "employeeLastname",
//                 message: "What is the employee's last name?"
//             },
//             {
//                 type: "list",
//                 name: "employeeRole",
//                 message: "What is the employee's role?",
//                 choices: roleList
//             },
//         ])
//             .then((answers) => {
//                 let newFirstName = answers.employeeFirstname;
//                 let newLastName = answers.employeeLastname;
//                 let newEmployeeRole = answers.employeeRole;
//                 db.query('SELECT * FROM employee_db.employees;', function (err, results) {
//                     let employeeNames = [];
//                     results.forEach(result => employeeNames.push({ name: result.first_name + ' ' + result.last_name, value: result.id }));

//                     return inquirer.prompt([
//                         {
//                             type: "list",
//                             name: "employeemanager",
//                             message: "Who is the employee's manager?",
//                             choices: employeeNames
//                         },
//                     ])
//                         .then((answers) => {
//                             let managerOptions = answers.employeemanager;
//                             db.query("INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [newFirstName, newLastName, newEmployeeRole, managerOptions], function (err, results) {
//                                 console.log(err);
//                             })
//                             console.log("Employee has been added!")
//                             questions();
//                         })
//                 })
//             })
//     })
// };

// function updateEmployee() {
//     db.query('SELECT * FROM employee_db.employees;', function (err, results) {
//         let employeeList = [];
//         results.forEach(result => employeeList.push({ name: result.first_name + ' ' + result.last_name, value: result.id }));
//         return inquirer.prompt([
//             {
//                 type: "list",
//                 name: "employeeUpdate",
//                 message: "Which employee would you like to update?",
//                 choices: employeeList
//             },
//         ])
//             .then((answers) => {
//                 let employee = answers.employeeUpdate;
//                 db.query('SELECT * FROM employee_db.roles;', function (err, results) {
//                     let roles = [];
//                     results.forEach(result => roles.push({ name: result.title, value: result.id }));

//                     return inquirer.prompt([
//                         {
//                             type: "list",
//                             name: "roleUpdate",
//                             message: "What is the employee's new role?",
//                             choices: roles
//                         },
//                     ])
//                         .then((answers) => {
//                             let newrole = answers.roleUpdate;
//                             db.query('UPDATE employee_db.employees SET role_id = ? WHERE id = ?', [newrole, employee], function (err, results) {
//                             console.log("Employee has been updated!");
//                             questions();
//                             })
//                         })
//                 })
//             })
//     })
// };

// // exit function
// function exit() {
//     console.log("Employee Tracker completed!");
//     // db.end();
// };



// // importing inquirer
// const inquirer = require('inquirer');
// const connectDatabase = require("./database/connect");
// // importing mysql12
// const mysql2 = require('mysql2');
// const fs = require('fs');
// require ('console.table');

// // Calling functions from departments.js
// const { getDepartments, 
//         createDepartment, 
//         deleteAllDepartments,
//         } = require('./src/db-operations/departments');

// // Calling functions from roles.js
// const { createRole, 
//         getRoles 
//       } = require('./src/roles');

// // Calling functions from employees.js
// const { createEmployee, 
//         getEmployees,
//         updateEmployeeRole, 
//         } = require('./src/employees');


// // Initiate questions with inquirer
// function mainMenu() {
//   return inquirer.prompt([{
//     message: 'What would you like to do?',
//     type: 'list',
//     choices: [
//       'View all departments', 
//       'Add department', 
//       'View all roles', 
//       'Add role',
//       'View all employees', 
//       'Add employee', 
//       'Update employee role',
//       'Exit',
//     ],
//     name: 'options'
//     // Getting users answer.
//   }]).then(async (answer) => {
    
//     if (answer.option === 'Exit') {
      
//       // End process - exit the terminal
//       process.exit(0)
//     };
         
//       // If user chooses = 'view all departments', display table.
//     if (answer.option === 'View All Departments') {
//       console.table(await getDepartments());
//     };


//     // If user chooses = 'add a department' initiate the relevant questions.
//     // once the user supplied the department name, the dept will be added to db
//     if (answer.option === 'Add Department') {
//       //Use function to display table
//       await askToCreateDepartment();  
//     };
    
//     // If user chooses = 'View roles' show table
//     // display formatted table - job title, role id, the department that role belongs to, and the salary for that role.
//     if (answer.option === 'View all roles') {
//        //Use function to display table
//        console.table(getRoles());
//     }

//     // If user chooses = 'Add role' 
//     // app will prompt user to enter the name, salary, and department for the role and that role is added to the database - fk
//     if (answer.option === 'Add role') {
//       await createRole(); 
//     };

//     // If user chooses = 'View all employees' show table
//     //display table - employees ids, first names, last names, job titles, departments, salaries, and manager.
//     if (answer.option === 'View all employees') {
//       console.table(getEmployees());
//     };

//     //add an employee
//     //app will prompt user to provide the relevant details
//     // add to the data base 
//     if (answer.option === 'Add employee') {
//       await createEmployee();
//     };
 
//     // update an employee role - app will prompt to select the employee to update and the new role.
//     // app will update the employee role base on user selection.
//     if (answer.option === 'Update employee role') {
//       await updateEmployeeRole();
//    };
    
//    // initiate inquirer questions again.
//     mainMenu();
  
//   }
//   )}

//   mainMenu();
     