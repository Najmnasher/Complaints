var express = require('express');
var router = express.Router();
const { getCompanies, signUp,  signIn} = require("../controllers")
const { isAuthenticated }= require('../../middlewares/isAuthenticated')

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/',isAuthenticated ,getCompanies);

module.exports = router;
