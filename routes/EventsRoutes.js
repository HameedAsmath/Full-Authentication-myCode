// URL PATH
const express = require("express");
const {
    addEvent,
    getAllEvents
} = require("../controllers/EventsController");
const router = express.Router();
const auth = require("../middleware/auth")

//addEvent route
router.post("/addevent", addEvent);

// get all events
router.get("/getallevents", getAllEvents)



module.exports = router;
