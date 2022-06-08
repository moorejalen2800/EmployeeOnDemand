const mysql = require("mysql2");
const consoleTables = require("console.table");
const inquirer = require("inquirer");


// Connect to database 
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: "3306",
    password: "moorejalen",
    database: "employees_db"
});

connection.connect(function (err) {
    if (err)
        throw err;
});

// Renders App In Terminal 

const App = () => {

    inquirer

        .prompt({
            name: "choice",
            type: "list",
            message: "Welcome to Your Employee Tracker?",
            choices: [
                "View all Employees",
                "View all Departments",
                "View all Roles",
                "Add an Employee",
                "Add a Department",
                "Add a Role",
                "Update Employee role",
                "Remove Employee",
                "Exit"
            ]


        }).then(function (answer) {
            switch (answer.choice) {
                case 'View all Employees':
                    viewAllEmployees();
                    break;


                case 'View all Departments':
                    viewAllDepartments();
                    break;


                case 'View all Roles':
                    viewAllRoles();
                    break;


                case 'Add an Employee':
                    addEmployee();
                    break;


                case 'Add a Department':
                    addDepartment();
                    break;


                case 'Add a Role':
                    addRole();
                    break;


                case 'Update Employee Role':
                    updateRole();
                    break;


                case 'Remove Employee':
                    removeEmployee();
                    break;
                    

                case 'Exit':
                    exitApp();
                    break;

                default:
                    break;
            }
        })
};




// List all Emplopyee's

const viewAllEmployees = () => {
    const placeholder = `SELECT * FROM employee
     INNER JOIN role on role.id = 
    employee.role_id 
    INNER JOIN department on department.id = role.department_id;`

    connection.query(`${placeholder}`,

        function (err, results) {
            if (err)
                throw err;
            console.table(results)

            App();
        })

}




// List different Departments

const viewAllDepartments = () => {
    connection.query(`SELECT * FROM department;`,

        function (err, result) {
            if (err)
                throw err;
            console.table(result);

            App();
        })

}

// List all Employee's Roles 

const viewAllRoles = () => {
    const placeholder = `SELECT role.title, role.salary, department.name
    FROM department
    INNER JOIN role ON role.department_id = department.id;`
    connection.query(`${placeholder}`,

        function (err, results) {
            if (err)
                throw err;
            console.table(results);

            App();
        })

}


// Funcation promts ability to Add new Employee's

const addEmployee = () => {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the Employee's First Name?",
                name: "First",
            },
            {
                type: "input",
                message: "What is the Employee's Last Name?",
                name: "Last",
            },
            {
                type: "input",
                message: "What is the Employee's role?",
                name: "Role",
            },
            {
                type: "input",
                message: "What is their manager ID",
                name: "Manager",
            },
        ])
        .then(function (answer) {
            connection.query(`INSERT INTO employee
             (first_name, last_name, 
                role_id, manager_id)
                VALUES (?,?,?,)`,
                [answer.first, answer.last, answer.role, answer.manager],
                function (err) {
                    if (err)
                        throw err;
                    console.table(answer);
                    App();
                })
        })
}

// adds new department 

const addDepartment = () => {
    inquirer
        .prompt({
            name: "Name",
            type: "Input",
            message: "What Department would you like to add?",
        })
        .then(function (answer) {
            connection.query(`INSERT INTO department SET ?`,
                {
                    name: answer.Name
                },
                function (err) {
                    if (err)
                        throw err
                    console.table(answer)
                    App();
                })
        })

}


// Adds new Role
const addRole = () => {

    inquirer
        .prompt([
            {
                type: "Input",
                message: "What is the name of the role?",
                name: "Role",
            },
            {
                type: "Input",
                message: "What is the salary of the role?",
                name: "Salary",
            },
            {
                type: "Input",
                message: "What is the department ID for the role?",
                name: "Department",
            },
        ])
        .then(function (answer) {
            connection.query(`INSERT INTO role (title, salary, department_id)
        VALUES (?,?,?)`,
                [answer.role, answer.salary, answer.dep],
                function (err) {
                    if (err)
                        throw err;
                    console.table(answer);
                    App();
                })
        })

}


// Updates roles 

const updateRole = () => {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err)
            throw err;
        const employeeNames = res.map(e => ({
            name: `${employee.first_name} 
        ${employee.last_name}`, value: employee.id
        }))

        connection.query("SELECT * FROM role", function (err, res) {
            if (err)
                throw err;
            var newRole = res.map(r => ({
                name: `${roles.title}`, value: roles.id
            }))

            inquirer
                .prompt([
                    {
                        type: "list",
                        name: "employee",
                        message: "Select employee to update.",
                        choices: employeeNames
                    },
                    {
                        type: "list",
                        name: "role",
                        message: "Select the new role.",
                        choices: newRole
                    }
                ])
                .then(({ employee, role }) => {
                    connection.query("update employee SET role_id = ? WHERE id = ?",
                        [role, employee], function (err, data) {
                            if (err)
                                throw err;
                            App();
                        })
                })
        })
    })
}

// Removes Employee

const removeEmployee = () => {

    inquirer
        .prompt({
            type: "list",
            name: "employee",
            message: "Who would you like to remove?",
            choices: employeeNames
        })
        .then((answer) => {
            connection.query(
                `DELETE FROM employee WHERE id=${answer.employeeNames}`,
                (err, res) => {
                    if (err) throw err;
                    App();
                }
            );
            console.table(answer);
        });
};







function exitApp() {

    connection.end();
}




function init() {

    App();
}

init();
