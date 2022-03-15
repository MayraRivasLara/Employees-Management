// Create Read Update Delete

const {createDepartment}= require('../../src/db-operations/departments');

const {faker}= require('@faker-js/faker');
const { createRole } = require('../../src/db-operations/roles');


async function seed() {

    // TRUNCATE all tables
    
    const createdDepartmentIds = [];
    // seed department
    for (let index = 0; index < 10; index++) {
        
        const result = await createDepartment(faker.commerce.department());
        createdDepartmentIds.push(result.insertId);
        
        
    };
    console.log('department seeded');
    
    // seed roles 
    for (let index = 0; index < 10; index++) {
        
        await createRole(
            faker.name.jobTitle(), 
            faker.datatype.number({ min: 1000, max: 10000}),
            faker.random.arrayElement(createdDepartmentIds)
        );
    };
    console.log('roles seeded');
    
    // // seed employees
    // for (let index = 0; index < 100; index++) {
        
    //     await createEmployee(faker.name.findName());
                
    // }

}

seed();