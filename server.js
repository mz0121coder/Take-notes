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