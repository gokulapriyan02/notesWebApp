import express from "express";
import pg from "pg";
import cors from "cors";

const app = express();
const port = 3000;
const db = new pg.Client({
    user: "prime",
    password: "2004",
    host: "localhost",
    port: "5432",
    database: "apps"
});

db.connect();
app.use(cors());
app.use(express.json());

app.get("/", async(req, res) =>{
    try{
    let notes = await db.query("SELECT * FROM notes");
    res.json(notes.rows);
    }
    catch(err){
        console.error(err);
        res.status(500).send("database error");
    }
})

app.post("/", async (req, res) => {
    try{
    const title = req.body.title;
    const content = req.body.content; 
    const NoteId = req.body.id;

    if (NoteId === undefined){

            let result = await db.query("INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *", [title, content]);
            let data = result.rows;
            res.json(data);
    }

    else{
        let result = await db.query("UPDATE notes SET title = $1, content= $2 WHERE id = $3 RETURNING *", [title, content, NoteId]);
        let data = result.rows;
        res.json(data[0]);
    }
    }
    catch(err){
        console.error(err);
        res.status(500).send("database error");
    }
});

app.post("/delete", async (req, res) =>{
    try{
    const key = req.body.id;
    const result = await db.query("DELETE FROM notes WHERE id = $1 RETURNING * ", [key] )
      res.json(result.rows[0]);

    }
    catch(err){
        console.error(err);
        res.status(500).send("database error");
    }
})


app.post("/edit", async (req, res) =>{

    let id = req.body.id;
    let oldNote = await db.query("SELECT title, content, id FROM notes WHERE id = $1", [id]);
    res.json(oldNote.rows)
})
app.listen(port, ()=> (console.log("server activated")));