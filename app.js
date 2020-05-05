const mysql = require("mysql");
const inquirer = require("inquirer");

const GET_ALL_EMPLOYEES = "Get all employees";
const GET_DEPARTMENTS = "Get departments";
const GET_ROLES = "Get roles";

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "BeacHrD1213",
    database: "employeehw_db"
});

connection.connect(function (err) {
    if (err) throw err;
    //runSearch();
});

//create, read, update, delete

async function main() {
    const answers = await inquirer.prompt([{
        name: "task",
        message: "What would you like to do?",
        type: "list",
        choices: [GET_ALL_EMPLOYEES,GET_DEPARTMENTS,GET_ROLES, "Add employee","Add department","Add role", "exit"]
    }]);
    const task = answers.task;
    if (task === "exit") {
        console.log("thanks for using");
        return
    } else if (task === GET_ALL_EMPLOYEES) {
        connection.query(" SELECT * FROM EMPLOYEE ", function (err, data) {
            console.table(data);
        });
    } else if (task === "Add employee") {
        addEmployee();
    } else if (task === "Add department"){
        addDepartment();
    }else if (task === GET_DEPARTMENTS) {
        connection.query(" SELECT * FROM DEPARTMENT ", function (err, data) {
            console.table(data);
        });
    }else if (task === GET_ROLES) {
        connection.query(" SELECT * FROM ROLE ", function (err, data) {
            console.table(data);
        });
    }else if (task === "Add role"){
        addRole();
    }
}
async function addEmployee() {
    const answers = await inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "Employee First Name:"
        },
        {
            name: "lastName",
            type: "input",
            message: "Employee Last Name:"
        },
        {
            name: "roleId",
            type: "input",
            message: "Employee Role:"
        },
        {
            name: "managerId",
            type: "input",
            message: "Employee Department:"
        }
    ]);

    connection.query(
        "INSERT INTO employee SET ?",
        {
            first_name: answers.firstName,
            last_name: answers.lastName,
            role_id: answers.roleId,
            manager_id: answers.managerId
        },
        function (err) {
            if (err) throw err;
            console.log("Your employee was created successfully!");
            // re-prompt the user for if they want to bid or post

        }
    );
}
async function addDepartment(){
    const answersDept = await inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Department name:"
        },
    ]);

    connection.query(
        "INSERT INTO department SET ?",
        {
            name: answersDept.name,
          
        },
        function (err) {
            if (err) throw err;
            console.log("Your Department was created successfully!");
            // re-prompt the user for if they want to bid or post

        }
    );

}
async function addRole() {
    const answersRole = await inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "Role title:"
        },
        {
            name: "salary",
            type: "input",
            message: "Employee salary:"
        },
        {
            name: "departmentRoleId",
            type: "input",
            message: "Employee Role ID:"
        },
    ]);

    connection.query(
        "INSERT INTO role SET ?",
        {
            title: answersRole.title,
            salary: answersRole.salary,
            department_id: answersRole.departmentRoleId,
            
        },
        function (err) {
            if (err) throw err;
            console.log("Your role was created successfully!");
            // re-prompt the user for if they want to bid or post

        }
    );
}
main();