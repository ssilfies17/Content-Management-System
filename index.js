const util = require('util');
const inquirer = require('inquirer');
const table = require('console.table');
const db = require('./db/connection');

db.query = util.promisify(db.query);


const startQuestion = [
    {
        type: 'list',
        message: 'Please choose an option from the directory',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
        name: 'response',
        validate: function (answer) {

            if (answer.length < 1) {

                return console.log("Please select an option and hit ENTER");
            }
            return true;
        }
    }
];

function askStartQuestion() {
    inquirer
    .prompt (startQuestion)
    .then(({response}) => {
        if (response == 'View all departments') {
            viewAllDepartments();

        } else if (response == 'View all roles') {
            viewAllRoles();

        } else if (response == 'View all employees') {
            viewAllEmployees();

        } else if (response == 'Add a department') {
            addDepartment();

        } else if (response == 'Add a role') {
            addRole();

        } else if (response == 'Add an employee') {
            addEmployee();

        } else if (response == 'Update an employee role') {
            updateEmployee();
        };
    });
};



async function viewAllDepartments() {
    try {
        var results = await db.query('SELECT * FROM departments;');

        console.table(results);

    } catch (err) {

        console.error(err);
    };

    askStartQuestion();
};

async function viewAllEmployees() {
    try {
        var results = await db.query(`
        SELECT employees.id, employees.first_name, employees.last_name, roles.salary, roles.job_title, departments.department_name, managers.first_name AS manager_first_name, managers.last_name AS manager_last_name 
        FROM employees 
        LEFT JOIN roles ON employees.role_id = roles.id 
        LEFT JOIN departments ON employees.department_id = departments.id 
        LEFT JOIN employees managers ON employees.manager_id = managers.id;`);

        console.table(results);

    } catch (err) {

        console.error(err);
    };

    askStartQuestion();
};

async function viewAllRoles() {
    try {
        var results = await db.query('SELECT * FROM roles;');

        console.table(results);

    } catch (err) {

        console.error(err);
    };

    askStartQuestion();
};



async function addDepartment() {
    const { department } = await inquirer.prompt(
        [
            {
            type: "input",
            message: "Please enter department name you want to add.",
            name: "department",
                validate: function (answer) {
                    if (answer.length < 3) {

                        return console.log("Please enter a department name you'd like to add.");
                    }
                    return true;
                }
            }
        ]
    );
    try {
        await db.query(`INSERT INTO departments (department_name) VALUES ("${department}")`, );

        console.log(`${department} added to Departments.`);
    } catch (err) {

        console.error(err);
    };

    askStartQuestion();
};

async function addRole() {
    
    let departments = await db.query('SELECT * FROM departments;');

    let departmentList = departments.map(department => {
        return { name: department.department_name, value: department.id } ;
    });

    const { job_title, salary, department_id } = await inquirer.prompt(
        [
            {
                type: "input",
                message: "Please enter title of the new role.",
                name: "job_title",
                    validate: function (answer) {
                        if (answer.length < 3) {

                            return console.log("Please enter a role name.");
                        }
                        return true;
                    }
            },
            {
                type: "input",
                message: "Please enter salary of the new role.",
                name: "salary",
                    validate: function (answer) {
                        if (answer.length < 3) {

                            return console.log("Please enter this role's salary.");
                        }
                        return true;
                    }
            },
            {
                type: "list",
                message: "Please select a department for role.",
                choices: departmentList,
                name: "department_id",
                    validate: function (answer) {
                        if (!answer) {

                            return console.log("Please select the role's department.");
                        }
                        return true;
                    }
            }
        ]
    );

    try {
        await db.query(`INSERT INTO roles (job_title, salary, department_id) VALUES ("${job_title}", "${salary}", "${department_id}")`);

        console.log(`${job_title} added to Roles.`);
       
    } catch(err) {
        console.error(err);
    };

    askStartQuestion();
};

async function addEmployee() {

    let roles = await db.query('SELECT id, job_title FROM roles;');

    let roleList = roles.map(role => {
        return { name: role.job_title, value: role.id };
    });


    let departments = await db.query('SELECT * FROM departments;');

    let departmentList = departments.map(department => {
        return { name: department.department_name, value: department.id };
    });


    let managers = await db.query('SELECT id, first_name, last_name FROM employees;');

    let managerList = managers.map(manager => {
        return { name: manager.first_name + ' ' + manager.last_name, value: manager.id };
    });


    const { first_name, last_name, role_id, department_id, manager_id } = await inquirer.prompt(
        [
            {
                type: "input",
                message: "Please enter employee's first name.",
                name: "first_name",
                    validate: function (answer) {
                        if (answer.length < 2) {

                            return console.log("Please enter name.");
                        }
                        return true;
                    }
            },
            {
                type: "input",
                message: "Please enter employee's last name.",
                name: "last_name",
                    validate: function (answer) {
                        if (answer.length < 2) {

                            return console.log("Please enter name.");
                        }
                        return true;
                    }
            },
            {
                type: "list",
                message: "Please select a role for employee.",
                choices: roleList,
                name: "role_id",
                    validate: function (answer) {
                        if (!answer) {

                            return console.log("Please select role.");
                        }
                        return true;
                    }
            },
            {
                type: "list",
                message: "Please select a department for employee.",
                choices: departmentList,
                name: "department_id",
                    validate: function (answer) {
                        if (!answer) {

                            return console.log("Please select department.");
                        }
                        return true;
                    }
            },
            {
                type: "list",
                message: "Please select employee's manager.",
                choices: managerList,
                name: "manager_id",
                    validate: function (answer) {
                        if (!answer) {

                            return console.log("Please select a manager.");
                        }
                        return true;
                    }
            },
        ]
    );

    try {
        await db.query(`INSERT INTO employees (first_name, last_name, role_id, department_id, manager_id) VALUES ("${first_name}", "${last_name}", "${role_id}", "${department_id}", "${manager_id}");`);

        console.log(`${first_name} ${last_name} added to Employees.`);
        
    } catch(err) {

        console.error(err);
    };

    askStartQuestion();
}



askStartQuestion();