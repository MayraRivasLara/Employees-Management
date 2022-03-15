const inquirer = require('inquirer');
const connectDatabase = require("../database/connect");
require('console.table');

const { getRoles } = require("./roles");


async function createEmployee() {
    // connect to db
    const connection = await connectDatabase();
    return inquirer.prompt([
        {
          message: "Enter employee's first name?",
          name: "newFirstName",
          type: "input",
        },
        {
            message: "Enter employee's last name?",
            name: "newLastName",
            type: "input",
        },
        {
            message: "Enter a new role ID?",
            name: "newRoleId",
            type: "input",
        },
        {
            message: "Enter employee's Manager ID?",
            name: "ManagerId",
            type: "input",
        },
    
    ]).then((answer) => {
        console.log(answer);
        connection.query(
            "INSERT INTO `employees` (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)"
            [
               answer.newFirstName,
               answer.newLastName,
               // using ParseInt() function to return an Integer
               parseInt(answer.newRoleId),
               parseInt(answer.ManagerId)
            ],
            (req, res) => { 
                console.log("Id"+ answer.newFirstName + "added");
                connection.end() // end() method to ensure that all remaining queries are executed before the database connection closed.
                return res;
            }
        )
    })
}

async function getEmployees() {
    const connection = await connectDatabase();

    const employees = await connection.execute(
        "SELECT * FROM employee JOIN role ON employee.role_id role,id;"
    );

    return employees[0];

}


async function updateEmployeeRole() {
    const connection= await connectDatabase();
    const employees = await getEmployees();
    const roles = getRoles();
    const inquirerRoles = roles.map((role) => {
        return {
            name: role.title,
            value: role.id,
        };
    });

const inquirerId = employees.map((employee) => {
    return {
        name: employee.firstName + "" + employee.lastName,
        value: employee.id,
    }
});

return (inquirer.prompt([
    {
      message: "Which employee would yo like to update?",
      name: "updateEmployeeId",
      type: "list",
      choices: inquirerId,
    },
    {
      message: "please type employees new role",
      name: "updateEmployeeRole",
      type: "list",
      choices: inquirerRoles,
    },
    ]).then((answer) => {
    console.log(answer);
    return connection.query(
        "UPDATE `employees_management_db`.`employees` SET `role_id` = '?' WHERE (`id` = '?');",
        [answer.updateEmployeeRole,answer.updateEmployeeId]
    );

  })
)}

module.exports= {
    createEmployee,
    getEmployees,
    updateEmployeeRole,
};
