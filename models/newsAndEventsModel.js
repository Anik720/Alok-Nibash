const mongoose = require("mongoose");

const newsEventsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please give a title!"],
  },

  description: {
    type: String,
    required: [true, "Please give a description!"],
  },

  photo: {
    type: String,
  
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

const newsEvents = mongoose.model("newsEvents", newsEventsSchema);

module.exports = newsEvents;
