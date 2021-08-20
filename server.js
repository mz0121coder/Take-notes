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