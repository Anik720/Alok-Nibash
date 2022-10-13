const express = require("express");

const router = express.Router();

const faqController = require("../controllers/faqController");

const authController = require("../controllers/authController");
const protect = require("../middlewares/protect");
const restrictTo = require("../middlewares/restrictTo");

router.route("/").get(faqController.getAllFaq).post(faqController.createFaq);

router
  .route("/:id")
  .get(faqController.getFaq)
  .patch(faqController.updateFaq)
  .delete(faqController.deleteFaq);
module.exports = router;
