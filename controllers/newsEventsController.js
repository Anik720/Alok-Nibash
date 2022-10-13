const newsAndEvent= require("../models/newsAndEventsModel");
const AppError = require("./../utils/appError");

const factory = require("./handlerFactory");


exports.getAllnewsAndEvent= factory.getAll(newsAndEvent);
exports.createnewsAndEvent = factory.createOne(newsAndEvent);
exports.getnewsAndEvent = factory.getOne(newsAndEvent);
exports.updatenewsAndEvent = factory.updateOne(newsAndEvent);
exports.deletenewsAndEvent = factory.deleteOne(newsAndEvent);


