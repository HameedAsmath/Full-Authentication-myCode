// URL PATH
const express = require("express");
const {
    addEvent,
} = require("../controllers/EventsController");
const router = express.Router();
const auth = require("../middleware/auth")

//addEvent route
router.post("/addevent", addEvent);



module.exports = router;
