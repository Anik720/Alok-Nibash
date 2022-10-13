const express = require("express");

const router = express.Router();

const donationController = require("../controllers/donationController");

const authController = require("../controllers/authController");
const protect = require("../middlewares/protect");
const restrictTo = require("../middlewares/restrictTo");
const SSLCommerzPayment = require('sslcommerz-lts')

router
  .route("/")
  .get(donationController.getAllDonation)
  .post(donationController.createDonation);

router
  .route("/:id")
  .get(donationController.getDonation)
  .patch(donationController.updateDonation)
  .delete(donationController.deleteDonation);
module.exports = router;
