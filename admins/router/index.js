var express = require('express');
const { store, destroy } = require('../controllers');
var router = express.Router();

// Add new admin
router.post('/', store)

// Delete admin
router.delete('/:id', destroy)


module.exports = router;
