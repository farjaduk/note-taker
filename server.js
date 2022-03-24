const express = require("express");
const app = express();
const path =  require('path');
const db = require("./Develop/db/db.json");
const fs = require("fs");

const uuid = require('./Uuidhelper/uuid');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('Develop/public'));

app.get('path', (req, res) => {});

app.get('path', (req, res) => {});

app.get('path', (req, res) => {});

app.post('path', (req, res) => {});

app.delete('path', (req, res) => {});

app.listen(port, () => {
    
    console.log('Server started on port');
});