
async function AskToCreateEmployee() {

    return inquirer.prompt([
        {
            message: "Enter employee's first name?",
            name: "newFirstName",
            type: "input",
        },
        {
            message: "Enter employee's last name?",
            name: "newLastName",
            type: "input",
        },
        {
            message: "Enter a new role ID?",
            name: "newRoleId",
            type: "input",
        },
        {
            message: "Enter employee's Manager ID?",
            name: "ManagerId",
            type: "input",
        },

    ]).then((answer) => {
        console.log(answer);
    })

};