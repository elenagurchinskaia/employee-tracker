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
  inquirer
    .prompt([
      {
        // first name
        type: "input",
        name: "firstName",
        message: "What is the employee's first name?",
        validate: (value) =>
          value ? true : "Please, enter the employees's first name.",
      },
      {
        // last name
        type: "input",
        name: "lastName",
        message: "What is the employee's last name?",
        validate: (value) =>
          value ? true : "Please, enter the employees's last name.",
      },
      {
        // role
        type: "list",
        name: "role",
        message: "What is the employee's role?",
        choices: [
          "Sales Lead",
          "Salesperson",
          "Lead Engineer",
          "Software Engineer",
          "Account Manager",
          "Accountant",
          "Legal Team Lead",
          "Lawer",
        ],
      },
      {
        // manager
        type: "list",
        name: "manager",
        message: "Who is the employee's manager?",
        choices: [
          "None",
          "John Doe",
          "Mike Chan",
          "Ashley Rodriguez",
          "Kevin Tupik",
          "Kunal Singh",
          "Malia Brown",
          "Sarah Lourd",
          "Tom Allen",
        ],
      },
    ])
    // db.query roles
    .then((answer) => {
        // Get the role_id for the selected role
        db.query("SELECT id FROM roles WHERE title = ?", [answer.role], (err, roleData) => {
          if (err) {
            console.log(err);
            return;
          }
  
          const roleId = roleData[0].id;
          let managerId = null;
  
          // If the employee has a manager, get the manager_id for the selected manager
          if (answer.manager !== "None") {
            db.query("SELECT id FROM employees WHERE CONCAT(first_name, ' ', last_name) = ?", [answer.manager], (err, managerData) => {
                err
                ? console.log(err)
                : console.log("New employee added successfully!");
            });
            })
  
              managerId = managerData[0].id;
              let managerId = null

              .then((answer) => {
                // Get the role_id for the selected role
                db.query("SELECT id FROM roles WHERE title = ?", [answer.role], (err, roleData) => {
                            err
                            ? console.log(err)
                            : console.log("New employee added successfully!");
                        })
                });
          
                  const roleId = roleData[0].id;
                  let managerId = null;
          
                  // If the employee has a manager, get the manager_id for the selected manager
                  if (answer.manager !== "None") {
                    db.query("SELECT id FROM employees WHERE CONCAT(first_name, ' ', last_name) = ?", [answer.manager], (err, managerData) => {
                        err
                        ? console.log(err)
                        : console.log("New employee added successfully!");
                    })
                      }
          
                      managerId = managerData[0].id;

                      db.query(
                        "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
                        [answer.firstName, answer.lastName, roleId, managerId],
                        (err, result) => {
                            err
                            ? console.log(err)
                            : console.log("New employee added successfully!");
                        })
                    });

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
