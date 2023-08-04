// What is being asked?

// > 01. On start show a list of options.
// > > view all departments,
// > > view all roles,
// > > view all employees,
// > > add a department,
// > > add a role,
// > > add an employee,
// > > and update an employee role

// > 02. When I select the department list.
// call a function viewAllDeps
// > > view department id and name

// > 03. When I select a role
// > > job title, role id, the department
const inquirer = require("inquirer");
const db = require("db");

function init() {
  // inquirer promts
  inquirer.prompt([
    {
      type: "list",
      name: "option",
      message: "Choose an option:",
      choice: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Quit",
      ],
    },
  ]);
  // // options
  // VIEW
  // // departments
  // // roles
  // // employees
  // ADD
  // // departments
  // // roles
  // // employees
  // update employee role
}
function viewAllDepts() {
  // db query from departments
  db.query(`SELECT * FROM departments`, (err, results) => {
    err ? console.log(err) : console.log(results);
  });
}

function viewAllRoles() {
  // db query from roles tables
}

function viewAllEmployees() {
  // db query from employees table
}

function addDepartments() {
  // prompt for department name
  // // make new const for department name
  //  // .then db query INSERT new department
}
function addRoles() {
  // PROMPT
  // role name (TEXT)
  // role salary (INT)
  //   db.query departments
  // which department (LIST)
  // db query roles insert new role
}
function addEmployee() {
  // PROMPT
  // first name (TEXT)
  // last name (TEXT)
  // db.query roles
  // role (LIST)
  // manager (LIST)
  // db query employees INSERT new employee
}
function updateEmployeeRoles() {
  // PROMPT
  // which employee (LIST)
  // db query employees search emploee id
}

function quit() {
  console.log("Goodbye!");
  process.exit();
}
