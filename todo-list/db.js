const { Pool } = require("pg"); 


const pool = new Pool({
    user: "superuser",
    host: "localhost",
    database: "todolist",
    password: "selva",
    port: 5432, 
});

module.exports = pool; 