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
    }

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
    }

    askStartQuestion();
};

async function viewAllRoles() {
    try {
        var results = await db.query('SELECT * FROM roles;');

        console.table(results);

    } catch (err) {

        console.error(err);
    }

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
        db.query(`INSERT INTO departments (department_name) VALUES ("${department}")`, );

        console.log(`${department} added to Departments.`);
    } catch (err) {
        
        console.error(err);
    }
    askStartQuestion();
};

askStartQuestion();