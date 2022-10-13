const mongoose = require("mongoose");
//const autoIncrement = require("mongoose-auto-increment");
const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "Please give a question."],
  },

  answer: {
    type: String,
    required: [true, "Please give a answer."],
  },
});
// autoIncrement.initialize(mongoose.connection);

// faqSchema.plugin(autoIncrement.plugin, { model: "Faq", field: "order" });
const Faq = mongoose.model("Faq", faqSchema);

module.exports = Faq;
