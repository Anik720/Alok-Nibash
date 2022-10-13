const mongoose = require("mongoose");
//const autoIncrement = require("mongoose-auto-increment");
const teamSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please give a first name."],
  },
  lastName: {
    type: String,
    required: [true, "Please give a last name."],
  },

  designation: {
    type: String,
    required: [true, "Please give a designation."],
  },
  description: {
    type: String,
    required: [true, "Please give a description."],
  },
  photo: String,
  order: {
    type: Number,
    default:0
  },
});
// autoIncrement.initialize(mongoose.connection);

// teamSchema.plugin(autoIncrement.plugin, { model: "Team", field: "order" });
const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
