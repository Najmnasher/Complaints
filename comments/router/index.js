var express = require('express');
const { isAdmin } = require('../../middlewares/isAdmin');
const { isAuthenticated } = require('../../middlewares/isAuthenticated');
const { store, destroy } = require('../controller');
var router = express.Router();

router.post('/', isAuthenticated, store);
router.delete('/:id', isAdmin, destroy);

module.exports = router;
