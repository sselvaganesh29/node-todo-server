const { Pool } = require("pg"); 


const DB_connection = new Pool({
    user: "superuser",
    host: "localhost",
    database: "todolist",
    password: "selva",
    port: 5432, 
});

module.exports = DB_connection; 