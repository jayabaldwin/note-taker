// Creates router object on the imported express module
const router = require('express').Router();

// Imports modular routers for /notes
const notesRouter = require('./notes');

router.use('/notes', notesRouter);

module.exports = router;