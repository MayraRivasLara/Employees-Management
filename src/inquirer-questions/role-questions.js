
async function askToCreateRole() {

    return inquirer.prompt([
        {
            message: "What is the new role title?",
            name: "newRoleTitle",
            type: "input",
        },
        {
            message: "What is the salary?",
            name: "newRoleSalary",
            type: "input",
        },
        {
            message: "Please enter department id?",
            name: "newDeptId",
            type: "input",
        },

    ]).then((answer) => {
        console.log(answer);
    })

};
