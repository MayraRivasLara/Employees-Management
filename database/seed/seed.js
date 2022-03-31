// Create Read Update Delete

const {createDepartment}= require('../../src/db-operations/departments');

const {faker}= require('@faker-js/faker');

const { createRole } = require('../../src/db-operations/roles');

const { createEmployee } = require('../../src/db-operations/employees');


async function seed() {

    // TODO: TRUNCATE all tables
    
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
    
    // seed employees

    
    for (let index = 0; index < 15; index++) {
        
        const createdRoleId = [];
    
        const createdManagerId = [];
        
        // TODO: define the object that should go into array element en roleId and managerId
       
        const result = await createRole(faker.random.arrayElement(RoleId));
        createdRoleId.push(result.insertId);
        
        const result = await createManagerId(faker.random.arrayElement(ManagerId));
        createdManagerId.push(result.insertId);

        await createEmployee(
            faker.name.firstName(),
            faker.name.lastName(),
            faker.random.arrayElement(createdRoleId),
            faker.random.arrayElement(createdManagerId)                
        )
    }

}

console.log('employees seeded');

seed();