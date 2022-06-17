// importing inquirer
const inquirer = require("inquirer");
// importing mysql12
const mysql = require("mysql2");
// importing console.table
const consoleTable = require("console.table");

// connecting to database
require("dotenv").config();
const db = mysql.createConnection(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "employees_management_db",
  },
  console.log(`Connected to the Employee database.`)
);

// Initiate questions through Inquirer
function questions() {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "actions",
        message: "What would you like to do?",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add New Department",
          "Add New Role",
          "Add New Employee",
          "Update Employee Role",
          "Exit",
        ],
      },
    ])
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
    });
}

questions();

// show table functions based on user selection
function showDepartments() {
  console.log("Departments:\n");
  db.query(
    "SELECT * FROM employees_management_db.departments;",
    function (err, results) {
      console.table(results);
      if (err) {
        console.log(err);
      }
      questions();
    }
  );
}

function showRoles() {
  console.log("Roles:\n");
  db.query(
    "SELECT * FROM employees_management_db.roles;",
    function (err, results) {
      console.table(results);
      if (err) {
        console.log(err);
      }
      questions();
    }
  );
}

function showEmployees() {
  console.log("Current Employees:\n");
  db.query(
    "SELECT * FROM employees JOIN roles ON employees.role_id = roles.id;",
    function (err, results) {
      console.table(results);
      if (err) {
        console.log(err);
      }
      questions();
    }
  );
}

function addDepartment() {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "newdepartment",
        message: "Please type the name of the new department",
      },
    ])
    .then((answers) => {
      db.query(
        "INSERT INTO departments (name) VALUES (?)",
        [answers.newdepartment],
        function (err, results) {
          if (err) {
            console.log(err);
          }
        }
      );
      console.log("Added " + answers.newdepartment + " to departments!");
      questions();
    });
}

function addRole() {
  db.query("SELECT * FROM employee_db.departments;", function (err, results) {
    let departmentList = [];
    results.forEach((result) =>
      departmentList.push({ name: result.name, value: result.id })
    );
    return inquirer
      .prompt([
        {
          type: "input",
          name: "newrolename",
          message: "Please type the name of the new role?",
        },
        {
          type: "input",
          name: "newrolesalary",
          message: "What is the salary assigned to the new role?",
        },
        {
          type: "list",
          name: "newroledepartment",
          message: "What department does the new belong to?",
          choices: departmentList,
        },
      ])
      .then((answers) => {
        db.query(
          "INSERT INTO roles (title, department_id, salary) VALUES (?, ?, ?)",
          [
            answers.newrolename,
            answers.newroledepartment,
            answers.newrolesalary,
          ],
          function (err, results) {
            if (err) {
              console.log(err);
            }
          }
        );

        console.log(answers.newrolename + " Added to roles!");
        questions();
      });
  });
}

function addEmployee() {
  db.query(
    "SELECT * FROM employees_management_db.roles;",
    function (err, results) {
      let roleList = [];
      results.forEach((result) =>
        roleList.push({ name: result.title, value: result.id })
      );
      return inquirer
        .prompt([
          {
            type: "input",
            name: "employeeFirstname",
            message: "Please type employee's first name?",
          },
          {
            type: "input",
            name: "employeeLastname",
            message: "Please type employee's last name?",
          },
          {
            type: "list",
            name: "employeeRole",
            message: "Please type employee's role?",
            choices: roleList,
          },
        ])
        .then((answers) => {
          let newFirstName = answers.employeeFirstname;
          let newLastName = answers.employeeLastname;
          let newEmployeeRole = answers.employeeRole;
          db.query(
            "SELECT * FROM employees_management_db.employees;",
            function (err, results) {
              let employeeNames = [];
              results.forEach((result) =>
                employeeNames.push({
                  name: result.first_name + " " + result.last_name,
                  value: result.id,
                })
              );

              return inquirer
                .prompt([
                  {
                    type: "list",
                    name: "employeemanager",
                    message: "Who is the employee's manager?",
                    choices: employeeNames,
                  },
                ])
                .then((answers) => {
                  let selectManager = answers.employeemanager;
                  db.query(
                    "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
                    [newFirstName, newLastName, newEmployeeRole, selectManager],
                    function (err, results) {
                      console.log(err);
                    }
                  );
                  console.log("Employee has been added!");
                  questions();
                });
            }
          );
        });
    }
  );
}

function updateEmployee() {
  db.query(
    "SELECT * FROM employees_management_db.employees;",
    function (err, results) {
      let employeesList = [];
      results.forEach((result) =>
        employeesList.push({
          name: result.first_name + " " + result.last_name,
          value: result.id,
        })
      );
      return inquirer
        .prompt([
          {
            type: "list",
            name: "employeeUpdate",
            message: "Select the employee you would like to update?",
            choices: employeesList,
          },
        ])
        .then((answers) => {
          let employee = answers.employeeUpdate;
          db.query(
            "SELECT * FROM employees_management_db.roles;",
            function (err, results) {
              let roles = [];
              results.forEach((result) =>
                roles.push({ name: result.title, value: result.id })
              );

              return inquirer
                .prompt([
                  {
                    type: "list",
                    name: "roleUpdate",
                    message: "What is the new role?",
                    choices: roles,
                  },
                ])
                .then((answers) => {
                  let newrole = answers.roleUpdate;
                  db.query(
                    "UPDATE employees_management_db.employees SET role_id = ? WHERE id = ?",
                    [newrole, employee],
                    function (err, results) {
                      console.log("Employee has been updated!");
                      questions();
                    }
                  );
                });
            }
          );
        });
    }
  );
}
// exit function
function exit() {
  console.log("Good work, see you soon!");
}
