const Faq = require("../models/faqModel");
const AppError = require("./../utils/appError");

const factory = require("./handlerFactory");


exports.getAllFaq = factory.getAll(Faq);
exports.createFaq = factory.createOne(Faq);
exports.getFaq = factory.getOne(Faq);
exports.updateFaq = factory.updateOne(Faq);
exports.deleteFaq = factory.deleteOne(Faq);


