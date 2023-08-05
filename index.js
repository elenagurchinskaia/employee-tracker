const inquirer = require("inquirer");
const db = require("./config/connection");

// ====================================================== init ============================================================ //

function menu() {
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
          "Delete a department",
          "Add a role",
          "Delete a role",
          "Add an employee",
          "Delete an employee",
          "Update an employee role",
          "Quit",
        ],
      },
    ])
    .then((answer) => {
      //   console.log(answer);
      switch (answer.action) {
        case "View all departments":
          console.log(answer.action);
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
        case "Delete a department":
          deleteDepartments();
          break;
        case "Add a role":
          addRoles();
          break;
        case "Delete a role":
          deleteRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Delete an employee":
          deleteEmployee();
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

// ====================================================== viewAllDepts ============================================================ //

function viewAllDepts() {
  // db query from departments
  db.query("SELECT * FROM departments", (err, departments) => {
    err ? console.log(err) : console.table(departments);
    menu();
  });
}

// ====================================================== viewAllRoles ============================================================ //

function viewAllRoles() {
  // db query from roles tables
  db.query("SELECT * FROM roles", (err, roles) => {
    err ? console.log(err) : console.table(roles);
    menu();
  });
}

// ====================================================== viewEmployees ============================================================ //

function viewAllEmployees() {
  // db query from employees table
  db.query("SELECT * FROM employees", (err, employees) => {
    err ? console.log(err) : console.table(employees);
    menu();
  });
}

// ====================================================== addDepartments ============================================================ //

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
      menu();
    });
}
// ====================================================== deleteDepartments ============================================================ //

function deleteDepartments() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentId",
        message: "Enter the ID of the department you want to delete:",
        validate: (value) => (value ? true : "Please, enter a department ID."),
      },
    ])
    .then((answer) => {
      const departmentId = answer.departmentId;
      db.query(
        "DELETE FROM departments WHERE name = ?",
        [departmentId],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Department deleted successfully!");
          }
        }
      );
      menu();
    });
}

// ====================================================== addRoles ============================================================ //

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
          menu();
        }
      );
    });
}
// ====================================================== deleteRole ============================================================ //

function deleteRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleId",
        message: "Enter the ID of the role you want to delete:",
        validate: (value) => (value ? true : "Please enter a role ID."),
      },
    ])
    .then((answer) => {
      const roleId = answer.roleId;

      // Check if the role with the provided ID exists
      db.query(
        "SELECT id FROM roles WHERE id = ?",
        [roleId],
        (err, results) => {
          if (err) {
            console.log(err);
          } else {
            if (results.length === 0) {
              console.log(
                `Role with ID ${roleId} not found. Please enter a valid ID.`
              );
            } else {
              db.query(
                "DELETE FROM roles WHERE id = ?",
                [roleId],
                (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log(`Role with ID ${roleId} deleted successfully!`);
                  }
                }
              );
            }
          }
        }
      );
      menu();
    });
}
// ====================================================== addEmployee ============================================================ //

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
      db.query(
        "SELECT id FROM roles WHERE title = ?",
        [answer.role],
        (err, roleData) => {
          if (err) {
            console.log(err);
            return;
          }

          const roleId = roleData[0].id;

          // If the employee has a manager, get the manager_id for the selected manager
          if (answer.manager !== "None") {
            db.query(
              "SELECT id FROM employees WHERE CONCAT(first_name, ' ', last_name) = ?",
              [answer.manager],
              (err, managerData) => {
                if (err) {
                  console.log(err);
                  return;
                }

                managerId = managerData[0].id;

                // db.query().then((answer) => {
                // Get the role_id for the selected role
                db.query(
                  "SELECT id FROM roles WHERE title = ?",
                  [answer.role],
                  (err, roleData) => {
                    err
                      ? console.log(err)
                      : console.log("New employee added successfully!");
                  }
                );
                // });

                const roleId = roleData[0].id;

                // If the employee has a manager, get the manager_id for the selected manager
                if (answer.manager !== "None") {
                  db.query(
                    "SELECT id FROM employees WHERE CONCAT(first_name, ' ', last_name) = ?",
                    [answer.manager],
                    (err, managerData) => {
                      err
                        ? console.log(err)
                        : console.log("New employee added successfully!");
                    }
                  );
                }

                managerId = managerData[0].id;

                db.query(
                  "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
                  [answer.firstName, answer.lastName, roleId, managerId],
                  (err, result) => {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log("New employee added successfully!");
                    }
                    menu();
                  }
                );
              }
            );
          } else {
            db.query(
              "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
              [answer.firstName, answer.lastName, roleId, null],
              (err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log("New employee added successfully!");
                }
                menu();
              }
            );
          }
        }
      );
    });
}

// manager (LIST)
// db query employees INSERT new employee
// ====================================================== deleteEmployee ============================================================ //

function deleteEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employeeId",
        message: "Enter the ID of the employee you want to delete:",
        validate: (value) => (value ? true : "Please enter an employee ID."),
      },
    ])
    .then((answer) => {
      const employeeId = answer.employeeId;

      db.query(
        "DELETE FROM employees WHERE id = ?",
        [employeeId],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log(`Employee with ID ${employeeId} deleted successfully!`);
          }
        }
      );
      menu();
    });
}
// ====================================================== updateEmployeeRoles ============================================================ //

function updateEmployeeRoles() {
  // PROMPT
  // which employee (LIST)
  // db query employees search emploee id
  db.query("SELECT * FROM employees", (err, employeesData) => {
    if (err) {
      console.log(err);
      return;
    }

    // create an array of employee choices in the format first and last name
    const employeeChoices = employeesData.map(
      (employee) => `${employee.first_name} ${employee.last_name}`
    );

    // prompt the user to select an employee to update
    inquirer
      .prompt([
        {
          type: "list",
          name: "selectedEmployee",
          message: "Choose the employee to update:",
          choices: employeeChoices,
        },
      ])
      .then((answer) => {
        // find the selected employee in the employeesData array
        const selectedEmployee = employeesData.find(
          (employee) =>
            `${employee.first_name} ${employee.last_name}` ===
            answer.selectedEmployee
        );

        // query the roles to get a list of role titles
        db.query("SELECT id, title FROM roles", (err, rolesData) => {
          if (err) {
            console.log(err);
            return;
          }

          // create an array of role choices with only role titles
          const roleChoices = rolesData.map((role) => role.title);

          // prompt the user to select a new role for the employee
          inquirer
            .prompt([
              {
                type: "list",
                name: "newRole",
                message: "Choose the new role for the employee:",
                choices: roleChoices,
              },
            ])
            .then((answer) => {
              // find the selected role in the rolesData array
              const selectedRole = rolesData.find(
                (role) => role.title === answer.newRole
              );

              // update the employee's role in the database
              db.query(
                "UPDATE employees SET role_id = ? WHERE id = ?",
                [selectedRole.id, selectedEmployee.id],
                (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log("Employee role updated successfully!");
                  }
                }
              );
              menu();
            });
        });
      });
  });
}
// ====================================================== quit ============================================================ //

function quit() {
  console.log("Goodbye!");
  process.exit();
}

function init() {
  menu();
}

init();
