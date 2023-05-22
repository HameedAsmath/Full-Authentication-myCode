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

exports.getEvent = async(req,res)=>{
  try {
    const id = req.params.id
    const getEvent = await Event.findById(id)
    res.status(200).json(getEvent)
  } catch (error) {
    console.log(error)
    res.status(401).json(error);
  }
}

exports.updateEvent = async(req,res) => {
  try {
    const id = req.params.id
    const updatedEvent = await Event.findByIdAndUpdate(id,req.body)
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(401).json(error);
  }
}

exports.deleteEvent = async(req,res) =>{
  try {
      const id = req.params.id
      const deletedEvent = await Event.findByIdAndDelete(id)
      res.status(200).json(deletedEvent);
  } catch (error) {
      res.status(401).json(error);
  }
}

