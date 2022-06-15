var express = require('express');
var router = express.Router();
const { signUp, signIn } = require('../controllers')

/* GET home page. */
router.post('/signup', signUp);
router.post('/signin', signIn);

module.exports = router;
