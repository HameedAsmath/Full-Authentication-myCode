// URL PATH
const express = require("express");
const {
  register,
  login,
  logout,
  userdetails,
} = require("../controllers/userControllers");
const router = express.Router();
const auth = require("../middleware/auth")

//Register route
router.post("/register", register);

//login route
router.post("/login", login);

//logout
router.get("/logout", logout) 

//userdetailsroute
router.post("/userdetails", userdetails);

module.exports = router;
