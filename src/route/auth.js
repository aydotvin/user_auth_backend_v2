const express = require("express");
const router = express.Router();
const { userSignup, userSignin, userSignout } = require("../controller/auth");

//	change the methods accordingly.
router.post("/signup", userSignup);
router.post("/signin", userSignin);
router.get("/signout", userSignout);

module.exports = router;
