var express = require('express');
var router = express.Router();
var { getCompanies, setCompany } = require("../controllers/companyController")

/* GET home page. */
router.get('/', getCompanies);
router.post('/', setCompany);


module.exports = router;
