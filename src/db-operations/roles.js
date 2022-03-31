// CRUD 
const inquirer = require('inquirer');

const connectDatabase = require("../../database/connect");

async function createRole(roleName, roleSalary, departmentId) {

    const connection = await connectDatabase();


    const [result] = await connection.query(
        
        "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)",
        [
            roleName,
            roleSalary,
            departmentId
        ],

    );

    return result;
}

async function getRoles() {
    const connection = await connectDatabase();
    const roles = await connection.execute("SELECT * FROM roles;");

    return roles[0];

}

module.exports = {
    createRole,
    getRoles,
};