const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const port = 3306

app.listen(process.env.PORT || port, () => {
    console.log(`runnig on port ${port}`);
})

const db = mysql.createPool({
    host: 'sql12.freesqldatabase.com',
    user: 'sql12602192',
    password: 'jYK1U9bs1G',
    database: 'sql12602192'
})

app.use(cors());    

app.get("/", (req,res) => {
    
    const sqlQuery = "SELECT * FROM dongeng";
    db.query(sqlQuery, (err, rows) => {

        if (err) {
            res.send("ERROR DATABASE")       
        } else {
            res.json(rows)
        }
              
    })
    
})

app.get("/:id", (req,res) => {
    const id = req.params.id;
    
    const sqlQuery = `SELECT * FROM dongeng where id_dongeng = ${id}`;
    db.query(sqlQuery, (err, rows) => {
        
        try{
            res.json(rows[0])     
        } catch (error) {
            res.json({ message: error.message});
        }
     
    })
    
})

