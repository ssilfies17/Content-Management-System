INSERT INTO departments (department_name)
VALUES ("Legal"),
       ("Marketing"),
       ("Distributing"),
       ("Sales");

INSERT INTO roles (job_title, department_id, salary)
VALUES ("Head of Marketing", 4, 120000),
       ("Lead Salesman", 1, 90000),
       ("Accountant", 2, 100000),
       ("Lawyer", 3, 110000);

INSERT INTO employees (first_name, last_name, role_id, department_id, manager_id)
VALUES ("Joe", "Dirt", 1, 3, NULL),
       ("George", "Washington", 2, 2, 1),
       ("Gerold", "Pascal", 3, 1, 1),
       ("Bill", "Clark", 4, 4, 1);