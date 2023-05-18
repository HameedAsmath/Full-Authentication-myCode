const Event = require("../model/event");
exports.addEvent = async(req,res) => {
    try {
        const { images, date, venue} = req.body;
        if (!( images && date && venue)) {
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
        });
        res.status(201).json(event);
      } catch (error) {
        console.log(error);
      }
}