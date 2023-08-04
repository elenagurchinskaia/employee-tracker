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
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
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
    ])
    .then((answer) => {
      switch (answer.option) {
        case "View all departments":
          viewAllDepts();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "View all employees":
          viewAllEmployees();
          break;
        case "Add a department":
          addDepartments();
          break;
        case "Add a role":
          addRoles();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateEmployeeRoles();
          break;
        case "Quit":
          quit();
          break;
      }
    });
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
  db.query("SELECT * FROM departments", (err, results) => {
    err ? console.log(err) : console.log(results);
  });
}

function viewAllRoles() {
  // db query from roles tables
  db.query("SELECT * FROM roles", (err, results) => {
    err ? console.log(err) : console.log(results);
  });
}

function viewAllEmployees() {
  // db query from employees table
  db.query("SELECT * FROM employees", (err, results) => {
    err ? console.log(err) : console.log(results);
  });
}

function addDepartments() {
  // prompt for department name
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "What is the name of the department?",
        validate: (value) =>
          value ? true : "Please, enter a department name.",
      },
    ])
    // // make new const for department name
    //  // .then db query INSERT new department
    .then((answer) => {
      db.query(
        "INSERT INTO departments (name) VALUES (?)",
        [answer.departmentName],
        (err, result) => {
          err
            ? console.log(err)
            : console.log("New department added successfully!");
        }
      );
    });
}
function addRoles() {
  // PROMPT
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Enter the role title:",
        validate: (value) => (value ? true : "Please, enter a role title."),
      },
      {
        type: "number",
        name: "salary",
        message: "Enter the role salary:",
        validate: (value) =>
          !isNaN(value) ? true : "Please, enter a valid salary.",
      },
      {
        type: "list",
        name: "department",
        message: "Choose the department:",
        choices: ["Sales", "Engineering", "Finance", "Legal"],
      },
    ])
    .then((answer) => {
      // Get the department_id for the selected department
      db.query(
        "SELECT id FROM departments WHERE name = ?",
        [answer.department],
        (err, departmentData) => {
          err ? console.log(err) : console.log(err);

          const departmentId = departmentData[0].id;

          // Insert new role into the roles table
          db.query(
            "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)",
            [answer.title, answer.salary, departmentId],
            (err, result) => {
              err
                ? console.log(err)
                : console.log("New role added successfully!");
            }
          );
        }
      );
    });
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
