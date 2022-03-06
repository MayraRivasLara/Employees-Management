// Create Read Update Delete

const {createDepartment}= require("../../src/departments");
const {faker}= require('@faker-js/faker')


async function seed() {

    // seed department
    for (let index = 0; index < 10; index++) {
        
        await createDepartment(faker.commerce.department());
        
    }
    
    // seed roles 
    
    
    // seed employees
}


seed();
// createDepartment('abc'). then((res) => {
//     console.log(res);
// });