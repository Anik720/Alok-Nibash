const Campaign = require("../models/campaignModel");
const AppError = require("./../utils/appError");

const factory = require("./handlerFactory");


exports.getAllCampaign= factory.getAll(Campaign);
exports.createCampaign = factory.createOne(Campaign);
exports.getCampaign = factory.getOne(Campaign);
exports.updateCampaign = factory.updateOne(Campaign);
exports.deleteCampaign = factory.deleteOne(Campaign);


