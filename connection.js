const mysql=require("mysql2");
const connection=mysql.createConnection({
host: "local host",
user: "moorejalen",
password: "moorejalen",
database: "employees"
});

connection.connect(function (err) {
    if(err) throw err;
});
 module.exports=connection;