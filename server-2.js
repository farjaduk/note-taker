const express = require("express");
const app = express();
const path =  require('path');
const db = require("./Develop/db/db.json");
const fs = require("fs");

const uuid = require('./Uuidhelper/uuid');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('Develop/public'));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/Develop/public/notes.html'))
);

app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./Develop/db/db.json"));
    
});



app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});



app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);

    let newNote = req.body; 
    let noteList = JSON.parse(fs.readFileSync("./Develop/db/db.json", "utf8"));

    
    newNote.id = uuid();
    
    noteList.push(newNote); 

    //updates data on database 
    fs.writeFileSync("./Develop/db/db.json", JSON.stringify(noteList)); 
    res.json(noteList);

})

app.delete("/api/notes/:id", (req, res) => {
    console.info(`${req.method} request received.`);

    let noteList = JSON.parse(fs.readFileSync("./Develop/db/db.json", "utf8"));
    let noteId = (req.params.id).toString();


    noteList = noteList.filter(selected =>{
        return selected.id != noteId;
    })

    //saves everything but selected 
    fs.writeFileSync("./Develop/db/db.json", JSON.stringify(noteList));

    res.json(noteList);
});


app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env); 
  });