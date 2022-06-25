var express = require('express');
const { isAdmin } = require('../../middlewares/isAdmin');
const { store, destroy, signIn } = require('../controllers');
var router = express.Router();

// Add new admin
router.post('/', isAdmin, store)

// Delete admin
router.delete('/:id', isAdmin, destroy)

// Sign in as admin
router.post('/signin', signIn)


module.exports = router;
