const express = require("express");
const app = express();
const con = require("./db");
const PORT = 3000;

app.use(express.json());

// Test route
app.get("/getalltask",  async (req, res) =>
    {
        try
        {
           let qry  = "SELECT * FROM task";

            const  result = await con.query(qry);

            res.json(result.rows);
        }
        catch ( err )
        {
            res.json({status : "exceptionOccur", error: err.message});
        }
});

app.post("/addtask", async (req,res ) => 
{
    const task = req.body.task;  

    try
    {
        let qry = "INSERT INTO task (task) VALUES ($1) RETURNING *";

        const result = await con.query(qry,[task]);

        res.json({status : "taskAdded"});

    }
    catch( err )
    {
        res.json({status : "exceptionOccur", error: err.message});
    }

});


app.put("/markasRead", async (req,res) =>
{
    const id = req.body.id;

    try
    {

        let qry = "UPDATE task SET status = true WHERE id = $1";

        await con.query(qry,[id]);

        res.json({status : "taskUpdated"});
    }
    catch( err )
    {
        res.json({status : "exceptionOccur", error: err.message});
    }

});

app.delete("/deleteTask", async ( req,res) =>
{

    const id = req.body.id;

    try
    {
        let qry = "DELETE FROM task WHERE id = $1";

        await con.query(qry,[id]);

        res.json({status : "taskDeleted"});

        
    }
    catch ( err )
    {
        res.json({status : "exceptionOccur", error: err.message});
    }
} );


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
 
