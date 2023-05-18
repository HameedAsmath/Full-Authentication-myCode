const Event = require("../model/event");
exports.addEvent = async(req,res) => {
    try {
        const { images, date, venue, heading, description} = req.body;
        if (!( images && date && venue && heading && description)) {
          return res.status(401).send("All fields are required");
        }
    
        //checking if the event already exist
        const exstEvent = await Event.findOne({ venue });
        if (exstEvent?.date===date) {
          return res.status(401).send("Event already exist");
        }
    
        //Create new entry
        const event = await Event.create({
          images,
          date,
          venue,
          heading,
          description
        });
        res.status(201).json(event);
      } catch (error) {
        console.log(error);
        res.status(401).send("Something went wrong");
      }
}
exports.getAllEvents = async(req,res) => {
  try {
    const allEvents = await Event.find({})
    if(!allEvents){
      return res.status(404).send("No Events Found");
    }
    res.status(200).json(allEvents)
  } catch (error) {
    console.log(error)
    res.status(401).send("Something went wrong");
  }
}