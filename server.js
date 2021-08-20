// Dependencies
const fs = require('fs');
const path = require('path');
const express = require('express');

const PORT = process.env.PORT || 3001; 
const app = express(); 
// Parse data
app.use(express.urlencoded ({extended: true}));
app.use(express.json());
app.use(express.static('public')); 
// Require db.json to store notes
const{notes} = require('./db/db.json');
// Access notes input via req.body and add to db.json
function writeNote (body, previousNotesList) {
    const note = body; 
    previousNotesList.push(note); 
// Write file & return note to post route
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({notes : previousNotesList}, null, 2));
    return note; 
};
// Check if valid note title and text have been typed
function checkTitleAndText (note) {
    if (!note.title || typeof note.title !== 'string') {
        return false; 
    }
    if (!note.text || typeof note.text !== "string") {
        return false;
    }
    return true;   
};
// GET route, id = next index in array
app.get('/api/notes', (req, res) => {
    res.json(notes); 
});
app.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString(); 
    // Error message if note not properly enterred
    if (!checkTitleAndText(req.body)) {
        res.status(400).send('This note does not have the right format'); 
    } else {
        const note = writeNote(req.body, notes); 
        res.json(note);
    }
});  
