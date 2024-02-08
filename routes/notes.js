const router = require('express').Router();
const { readFromFile, readAndAppend, readAndDelete } = require('../helpers/fsUtils');
// Import random id generator
const uuid = require('../helpers/uuid');

// GET Route for retrieving user input into the notes, stored in the db.json file
router.get('/', (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new note
router.post('/', (req, res) => {
  console.log(req.body);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  if ( title && text ) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Tip added successfully`);
  } else {
    res.error('Error in adding note');
  }
});

// Route to delete note based on id
router.delete('/:id', (req, res) => {
  readAndDelete(req.params.id, "./db/db.json");
  res.json("Note deleted!");
});

module.exports = router;
