

async function askToCreateDepartment() {
    //initiate inquirer
    return (inquirer.prompt([
        {
            message: "What is the name of the department you would like to add?",
            name: "departmentName",
            type: "input",
        },

    ]).then((answer) => {
        console.log(answer);
        return createDepartment(answer.departmentName);
        
    })
    );
}