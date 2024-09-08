const express = require("express");
const router = express.Router();
const {signUpUser,signInUser } = require("../controller/userController");

router.post("/signUpUser",signUpUser);
router.post("/signInUser",signInUser);


module.exports = router;