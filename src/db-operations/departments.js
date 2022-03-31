// CRUD - Create Read Update and Delete

const inquirer = require('inquirer');

const connectDatabase = require("../../database/connect");

// call function to create department
async function createDepartment(departmentName){
    // connect to database (get the connection instance)
    const connection = await connectDatabase();

    const [result] = await connection.query(
        // add department to table
        "INSERT INTO `departments` (`name`) VALUES (?)", 
        [departmentName]
    )
    return result;

}

    // display departments table
    async function getDepartments() {
        // connect to database
        const connection = await connectDatabase();

        //Once connected select all columns from department table
        const departments = await connection.execute(
            'SELECT * FROM `departments`;') 

            // display data in the console
            return departments[0];
    }

async function deleteAllDepartments() {
    const dataBase= await connectDatabase();
    await dataBase.query("SET FOREIGN_KEY_CHECKS=0");
    const results = await dataBase.execute("TRUNCATE `departments`");
    await dataBase.execute("SET_FOREIGN_KEY_CHECKS=1");
    return results;
}

module.exports= {
    getDepartments,
    createDepartment,
    deleteAllDepartments,
};