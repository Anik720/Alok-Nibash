const Team= require("../models/teamModel");
const AppError = require("./../utils/appError");

const factory = require("./handlerFactory");


exports.getAllTeam= factory.getAll(Team);
exports.createTeam = factory.createOne(Team);
exports.getTeam = factory.getOne(Team);
exports.updateTeam = factory.updateOne(Team);
exports.deleteTeam = factory.deleteOne(Team);


