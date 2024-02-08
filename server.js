// Import express.js
const express = require('express');

// Import built-in Node.js package 'path' to resolve path of files that are located on the server
const path = require('path');

// Imports routes from index.js routes file
const api = require('./routes/index.js');


// Allows dynamic assignment of a port OR 3001 if not available
const PORT = process.env.PORT || 3001;

// Initialises an instance of express.js
const app = express();


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

// Static middleware pointing to public folder
app.use(express.static('public'));


// HTML routes
// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);


// Listens for incoming connections on PORT
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);