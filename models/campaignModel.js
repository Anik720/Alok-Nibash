const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please give a name!"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

campaignSchema.virtual("donations", {
  ref: "Donation",
  foreignField: "campaign",
  localField: "_id",
});

const Campaign = mongoose.model("Campaign", campaignSchema);

module.exports = Campaign;
