const express = require("express");
const bodyParser = require("body-parser");
const controller =require('../controllers/userController')
const router = express.Router();
router.use(bodyParser.json());

router.post("/login",controller.login)
router.post("/register",controller.register)

module.exports = router;