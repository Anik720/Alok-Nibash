const mongoose = require("mongoose");
const validator = require('validator');
const donationSchema = new mongoose.Schema(
  {

    name: {
      type: String,
      required: [true, "Please give a last name."],
    },
    phone: {
      type: String,
      required: [true, "Please give phone number."],
    },
    age: {
      type: Number,
      required: [true, "Please give your age."],
    },

    gender: {
      type: Number,
      required: [true, "Please give your gender."],
    },

    address: {
      type: Number,
      required: [true, "Please give your gender."],
    },

    email: {
      type: String,
      required: [true, "Please provide your email."],
      unique: true,
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    ananomyous: {
      type: Boolean,
      default: false,
    },

    amount: {
      type: Number,
      default: 0,
    },
    campaign: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "campaign",
      },
    ],
  }
);

donationSchema.pre(/^find/, function (next) {
  this.populate({
    path: "editor",
  });

  next();
});
const Donation = mongoose.model("Donation", donationSchema);

module.exports = Donation;
