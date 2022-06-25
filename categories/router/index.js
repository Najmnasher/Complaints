var express = require('express');
const { index, store, show, update, destroy } = require('../controllers');
var router = express.Router();

// Get all categories
router.get('/', index)

// Get category by id
router.get('/:id', show)

// Add new category
router.post('/', store)

// Edit category
router.put('/:id', update)

// Delete category
router.delete('/:id', destroy)


module.exports = router;
