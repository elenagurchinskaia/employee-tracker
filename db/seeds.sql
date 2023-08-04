-- seed data for departments
INSERT INTO departments (name)
VALUES ('Sales'),
       ('Engineering'),
       ('Finance'),
       ('Legal');
-- seed data for roles
INSERT INTO roles (title, department_id, salary)
VALUES ('Sales Lead', 1, 100000),
       ('Salesperson', 1, 80000),
       ('Lead Engineer', 2, 150000),
       ('Software Engineer', 2, 120000),
       ('Account Manager', 3, 160000),
       ('Accountant', 3, 125000),
       ('Legal Team Lead', 4, 250000),
       ('Lawyer', 4, 190000);
-- seed data for employees
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, NULL),
       ('Mike', 'Chan', 2, 1),
       ('Ashley', 'Rodriguez', 2, NULL),
       ('Kevin', 'Tupik', 2, 3),
       ('Kunal', 'Singh', 1, NULL),
       ('Malia', 'Brown', 3, 5),
       ('Sarah', 'Lourd', 4, NULL),
       ('Tom', 'Allen', 4, 7);
       