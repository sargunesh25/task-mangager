const express = require('express')
const cors = require("cors");
const app = express()
const db = require('./db')



//middleware
app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173", // Change to 3000 if using Create React App
    methods: "GET,POST,DELETE", // Allowed methods
    credentials: true // Allow cookies if needed
  }));

  
db.query('SELECT 1')
.then(data => {
    console.log('db connection successfull')
    app.listen(5000,()=>console.log('server started at port 5000'))
})
.catch(err=> console.log('db connection failed \n', err))


app.get("/task", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM todo_list");
        res.json(rows);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ error: "Database query failed" });
    }
});
app.post("/task/post", async (req, res) => {
    const {task} = req.body;
    try {
        const query = "INSERT INTO todo_list (task) VALUES (?)"
        const rows = await db.query(query,[task]);
        console.log(rows);
        res.status(201).json({message:"User Successfully Created", task:rows.insertId})
    } catch (err) {
        console.error("Error Creating New users:", err);
        res.status(500).json({ error: "Database query failed" });
    }
});

app.delete("/task/delete/:task", async (req, res) => {
    const { task } = req.params;
    
    try {
        const query = "DELETE FROM todo_list WHERE task = ?";
        const rows = await db.query(query, [task]);

        if (rows.affectedRows > 0) {
            res.status(200).json({ message: "Task successfully deleted" });
        } else {
            res.status(404).json({ error: "Task not found" });
        }
    } catch (err) {
        console.error("Error deleting task:", err);
        res.status(500).json({ error: "Database query failed" });
    }
});
