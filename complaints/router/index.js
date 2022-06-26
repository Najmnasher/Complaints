const express = require("express");
const router = express.Router();
const { store, changeStatus, verify } = require("../controllers");
const { isAdmin } = require("../../middlewares/isAdmin");
const { isUser } = require("../../middlewares/isUser");
const { userIsOwner } = require("../../middlewares/userIsOwner");

router.post('/', isUser, store);
router.put('/status/:id', isUser, userIsOwner, changeStatus);
router.put('/verify/:id', isAdmin, verify);

module.exports = router;
