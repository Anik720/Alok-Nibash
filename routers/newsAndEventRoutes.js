const express = require("express");

const router = express.Router();

const newsEventsController = require("../controllers/newsEventsController");

const authController = require("../controllers/authController");
const protect = require("../middlewares/protect");
const restrictTo = require("../middlewares/restrictTo");

router
  .route("/")
  .get(newsEventsController.getAllnewsAndEvent)
  .post(newsEventsController.createnewsAndEvent);

router
  .route("/:id")
  .get(newsEventsController.getnewsAndEvent)
  .patch(newsEventsController.updatenewsAndEvent)
  .delete(newsEventsController.deletenewsAndEvent);
module.exports = router;
