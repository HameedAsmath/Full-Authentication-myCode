// URL PATH
const express = require("express");
const {
    addEvent,
    getAllEvents,
    getEvent,
    updateEvent,
    deleteEvent
} = require("../controllers/EventsController");
const router = express.Router();
const auth = require("../middleware/auth")

//addEvent route
router.post("/addevent", addEvent);

// get all events
router.get("/getallevents", getAllEvents)

//get one event
router.get("/getevent/:id",getEvent)

//update event
router.put("/editevent/:id",updateEvent)

//delete event
router.delete("/deleteevent/:id",deleteEvent)


module.exports = router;
