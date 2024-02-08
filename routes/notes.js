const router = require('express').Router();
const { readFromFile, readAndAppend, readAndDelete } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all the tips
router.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new UX/UI tip
router.post('/', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if ( title && text) {
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

router.delete('/:id', (req, res) => {
  readAndDelete(req.params.id, "./db/db.json");
  res.json("Note deleted!");
});

module.exports = router;
