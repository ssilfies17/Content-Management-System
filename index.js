const util = require('util');
const inquirer = require('inquirer');
const table = require('console.table');
const db = require('./db/connection');

db.query = util.promisify(db.query);


const startQuestion = [
    {
        type: 'list',
        message: 'What would you like to do?',
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

