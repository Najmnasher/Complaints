const express = require("experss");
const router = express.Router();
const { add } = require("../controllers");
const { isAdmin } = require("../../middlewares/isAdmin");


router.post("/", add);

module.exports = router;
