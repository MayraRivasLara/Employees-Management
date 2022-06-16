// import inquirer
const inquirer = require('inquirer');
// import mysql12
const mysql = require('mysql2');
// import console.table
// const consoleTable = require("console.table");
// connect to database
const connectDatabase = require("./connect")

    
// when node server.js is run in the terminal - Inquirer Prompts to update, view and add (employees, roles + departments)
function questions() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'actions',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add New Department',
                'Add New Role',
                'Add New Employee',
                'Update Employee Role',
                'Exit']
        }])
        .then((answers) => {
            if (answers.actions === "View All Departments") {
                showDepartments();
            }

            if (answers.actions === "View All Roles") {
                showRoles();
            }
            if (answers.actions === "View All Employees") {
                showEmployees();
            }

            if (answers.actions === "Add New Department") {
                addDepartment();
            }

            if (answers.actions === "Add New Role") {
                addRole();
            }

            if (answers.actions === "Add New Employee") {
                addEmployee();
            }

            if (answers.actions === "Update Employee Role") {
                updateEmployee();
            }
            if (answers.actions === "Exit") {
                exit();
            }
        })
};

questions()

// show table functions based on user selection
function showDepartments() {
    console.log('These are all the departments:\n');
    db.query('SELECT * FROM employees_management_db.departments;', function (err, results) {
        console.table(results);
        if (err) {
            console.log(err);
        };
        questions();
    });
};

function showRoles() {
    console.log('These are all roles:\n');
    db.query("SELECT * FROM employees_management_db.roles;", function (err, results) {
        console.table(results);
        if (err) {
            console.log(err);
        };
        questions();
    })
};

function showEmployees() {
    console.log('These are current employees:\n'); 
    db.query('SELECT * FROM employees JOIN roles ON employees.role_id = roles.id;', function (err, results) {
        console.table(results);
        if (err) {
            console.log(err);
        };
        questions();
    })
};







// exit function
function exit() {
    console.log("Employee Tracker completed!");
    // db.end();
};