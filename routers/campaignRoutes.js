const express = require("express");

const router = express.Router();

const campaignController = require("../controllers/campaignController");

const authController = require("../controllers/authController");
const protect = require("../middlewares/protect");
const restrictTo = require("../middlewares/restrictTo");

router
  .route("/")
  .get( campaignController.getAllCampaign)
  .post(campaignController.createCampaign);

router
  .route("/:id")
  .get(campaignController.getCampaign)
  .patch(campaignController.updateCampaign)
  .delete(campaignController.deleteCampaign);
module.exports = router;
