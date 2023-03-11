// URL PATH
const express = require("express");
const {
  register,
  login,
  logout,
  dashboard,
  home
} = require("../controllers/userControllers");
const router = express.Router();
const auth = require("../middleware/auth")

//Home route
router.get("/",home)

//Register route
router.post("/register", register);

//login route
router.post("/login", login);

//logout
router.get("/logout", logout)

//dashboard route
router.get("/dashboard",auth, dashboard);

module.exports = router;
