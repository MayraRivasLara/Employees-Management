// CRUD - Create Read Update and Delete

/**
 * Create a new employee in db.
 * @param {string} firstName 
 * @param {string} lastName 
 * @param {number} roleId 
 * @param {number} managerId 
 */
 function createEmployee(firstName, lastName, roleId, managerId){
    
}

/**
 * Getting all the employees from db
 */
function getEmployees(){

}

/**
 * 
 * @param {number} employeeId 
 * @param {number} newRole 
 */
function updateEmployeeRole(employeeId, newRoleId){

};

async function deleteEmployee() {
    const dataBase= await connectDatabase();
    await dataBase.query("SET FOREIGN_KEY_CHECKS=0");
    const results = await dataBase.execute("TRUNCATE `employees`");
    await dataBase.execute("SET_FOREIGN_KEY_CHECKS=1");
    return results;
}

module.exports= {
    createEmployee,
    getEmployees,
    updateEmployeeRole,
    deleteEmployee,
};
