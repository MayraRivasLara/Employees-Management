
async function askToCreateRole() {

    return inquirer.prompt([
        {
            message: "Please provide the new role:",
            name: "newRoleTitle",
            type: "input",
        },
        {
            message: "What is the salary assigned to this role?",
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
