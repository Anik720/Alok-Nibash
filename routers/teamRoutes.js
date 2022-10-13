const express = require("express");

const router = express.Router();

const teamController = require("../controllers/teamController");

const authController = require("../controllers/authController");
const protect = require("../middlewares/protect");
const restrictTo = require("../middlewares/restrictTo");

router
  .route("/")
  .get(teamController.getAllTeam)
  .post(teamController.createTeam);

router
  .route("/:id")
  .get(teamController.getTeam)
  .patch(teamController.updateTeam)
  .delete(teamController.deleteTeam);
module.exports = router;
