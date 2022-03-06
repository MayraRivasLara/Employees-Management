// Create Read Update Delete

const {createDepartment}= require('../../src/departments');
const {createRole}= require('../../src/roles');
const {createEmployee}= require('../../src/employees');
const {faker}= require('@faker-js/faker')
const {connectDatabase}= require('../../database/connect')

async function seed() {

    // seed department
    for (let index = 0; index < 10; index++) {
        
        await createDepartment(faker.commerce.department());
        
        console.log(faker.fake('{{commerce.department}}'));
    };
    
    // seed roles 
    for (let index = 0; index < 30; index++) {
        
        await createRole(faker.name.jobTitle());
    };
    
    // seed employees
    for (let index = 0; index < 100; index++) {
        
        await createEmployee(faker.name.findName());
                
    }

}

seed();