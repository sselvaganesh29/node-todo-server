const express = require("express");
const frameWorkEX = express();
const con = require("./db");


frameWorkEX.use(express.json());


frameWorkEX.get("/getalltask",  async (req, res) =>
    {
        try
        {
           let qry  = "SELECT * FROM task";

            const  result = await con.query(qry);

            res.json(result.rows);
        }
        catch ( err )
        {
            res.json({Message : "exceptionOccur", error: err.message});
        }
});

frameWorkEX.post("/addtask", async (req,res ) => 
{
    const task = req.body.task;  

    if ( task == null)
    {
        res.json({Message : "Your task missing!!!!"});
    }

    try
    {
        let qry = "INSERT INTO task (task) VALUES ($1) RETURNING *";

        const result = await con.query(qry,[task]);

        res.json({Message : "taskAdded"});

    }
    catch( err )
    {
        res.json({Message : "exceptionOccur", error: err.message});
    }

});


frameWorkEX.put("/markasRead", async (req,res) =>
{
    const id = req.body.id;

    if ( task == null)
        {
            res.json({Message : "Task id missing!!!!"});
        }
    

    try
    {

        let qry = "UPDATE task SET status = true WHERE id = $1";

        await con.query(qry,[id]);

        res.json({Message : "taskUpdated"});
    }
    catch( err )
    {
        res.json({Message : "exceptionOccur", error: err.message});
    }

});

frameWorkEX.delete("/deleteTask", async ( req,res ) =>
{

    const id = req.body.id;

    if ( task == null)
        {
            res.json({Message : "Task id missing!!!!"});
        }

    try
    {
        let qry = "DELETE FROM task WHERE id = $1";

        await con.query(qry,[id]);

        res.json({Message : "taskDeleted"});

        
    }
    catch ( err )
    {
        res.json({Message : "exceptionOccur", error: err.message});
    }
} );


const PORT = 8888;

frameWorkEX.listen(PORT, () => console.log("Your server is running on the port " + PORT));
 
