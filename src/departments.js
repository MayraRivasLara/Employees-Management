// CRUD - Create Read Update and Delete

const connectDatabase = require("../database/connect");

/**
 * Create a new department in db.
 * @param {string} name 
 */
async function createDepartment(name){
    // connect to database (get the connection instance)
    const connection= await connectDatabase();

    // run a query to insert department based on name
    const [result]= await connection.execute(
        'INSERT INTO `departments` (`name`) VALUES (?)', 
        [name]
    );
    
    const createdId = result.insertId;
    
    //  return the created department
    return getDepartments(createdId);
}
    

async function getDepartments(id) {

    const connection= await connectDatabase();

    // run a query to insert department based on name
    const [result]= await connection.execute( 
        "SELECT * FROM `departments` WHERE `id`=?",
        [id]
    );
    
    if (result.length === 0) {
    throw new Error('Department not found!');
    }
    return result[0];
};

/**
 * Getting all the departments from db
 */
    function getDepartments(){

    }

// for the future implementation 
//function updateDepartments(id, salary){

// };

async function deleteAllDepts() {
    const dataBase= await connectDatabase();
    await dataBase.query("SET FOREIGN_KEY_CHECKS=0");
    const results = await dataBase.execute("TRUNCATE `departments`");
    await dataBase.execute("SET_FOREIGN_KEY_CHECKS=1");
    return results;
}

module.exports= {
    createDepartment,
    getDepartments,
    deleteAllDepts,
}