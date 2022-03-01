const express = requires('express');
const mysql2 = requires('mysql2');
const fs = requires('fs');


// landing page with list of choices to work with departments, employees and roles.

// choices 
// view all departments,
// should show all the departments in a table in the console

// add a department, 
// app will ask the user for the department name
// once the user supplied the department name, the dept will be added to db


// add role
// app will ask the user for the name of the role
// Salary for that role 
// for the department name (foreign key)

// update an employee role
// app will ask to choose the employee that you want to update
// user will select the new role from a list 
// update the employee role base on user selection


//add an employee
//app will ask to provide first name
// last name 
// employees role 
// name of the managers employee's responds to (foreign key)
// add to the data base 