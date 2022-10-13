const Donation = require("../models/donationModel");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const factory = require("./handlerFactory");
const SSLCommerzPayment = require('sslcommerz-lts')
exports.sslRequest=catchAsync(async(req,res,next)=>{
   
    
})
exports.getAllDonation= factory.getAll(Donation);
exports.createDonation  = factory.createOne(Donation);
exports.getDonation = factory.getOne(Donation);
exports.updateDonation = factory.updateOne(Donation);
exports.deleteDonation = factory.deleteOne(Donation);


