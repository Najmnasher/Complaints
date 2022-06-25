var express = require('express');
const { isAdmin } = require('../../middlewares/isAdmin');
const { index, store, show, update, destroy } = require('../controllers');
var router = express.Router();

// Get all categories
router.get('/', index)

// Get category by id
router.get('/:id', show)

// Add new category
router.post('/', isAdmin, store)

// Edit category
router.put('/:id', isAdmin, update)

// Delete category
router.delete('/:id', isAdmin, destroy)


module.exports = router;
