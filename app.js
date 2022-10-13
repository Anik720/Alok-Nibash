const express = require("express");
const app = express();
const cors = require("cors");
//const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const path = require("path");
const hpp = require("hpp");

const userRouter = require("./routers/userRouter");
const authRoutes = require("./routers/authRoutes");

const newsAndEventRoutes = require("./routers/newsAndEventRoutes");
const teamRoutes = require("./routers/teamRoutes");
const faqRoutes = require("./routers/faqRoutes");
const campaignRoutes = require("./routers/campaignRoutes");
const donationRoutes = require("./routers/donationRoutes");
//const sslRoutes = require("./routers/sslRoutes");
const SSLCommerz = require("sslcommerz-nodejs");
const globalErrorHandler = require("./middlewares/globalErrorHandler");

const AppError = require("./utils/appError");

// view engine setup
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// var whitelist = ['http://example1.com', 'http://example2.com']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
// app.use(cors(corsOptions))

app.use(express.json());

//console.log(process.env.NODE_ENV);

// set security http headers
app.use(helmet());

// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }

// $ CORS
app.use(cors());

//  set limit request from same API in timePeroid from same ip
// const limiter = rateLimit({
//   max: 100, //   max number of limits
//   windowMs: 60 * 60 * 1000, // hour
//   message: " Too many req from this IP , please Try  again in an Hour ! ",
// });

// app.use("/api", limiter);

//  Body Parser  => reading data from body into req.body protect from scraping etc
//app.use(express.json({ limit: "10kb" }));

// Data sanitization against NoSql query injection
app.use(mongoSanitize()); //   filter out the dollar signs protect from  query injection attact

// Data sanitization against XSS
app.use(xss()); //    protect from molision code coming from html

// testing middleware
// app.use((req, res, next) => {
//   //  console.log('this is a middleware');
//   next();
// });

// routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRoutes);

app.use("/api/v1/newsEvents", newsAndEventRoutes);
app.use("/api/v1/team", teamRoutes);
app.use("/api/v1/faq", faqRoutes);
app.use("/api/v1/campaign", campaignRoutes);
app.use("/api/v1/donation", donationRoutes);
//app.use("/api/v1", sslRoutes);
let settings = {
  isSandboxMode: true, //false if live version
  store_id:  process.env.STORE_ID,
  store_passwd:  process.env.STORE_PASSWORD
}
// app.get("/init", (req, res) => {

//   const data = {
//     total_amount: 100,
//     currency: "BDT",
//     tran_id: "REF123",
//     success_url: `http://localhost:5000/success`,
//     fail_url: `${process.env.ROOT}/ssl-payment-fail`,
//     cancel_url: `${process.env.ROOT}/ssl-payment-cancel`,
//     shipping_method: "No",
//     product_name: "Computer.",
//     product_category: "Electronic",
//     product_profile: "general",
//     cus_name: "Customer Name",
//     cus_email: "cust@yahoo.com",
//     cus_add1: "Dhaka",
//     cus_add2: "Dhaka",
//     cus_city: "Dhaka",
//     cus_state: "Dhaka",
//     cus_postcode: "1000",
//     cus_country: "Bangladesh",
//     cus_phone: "01711111111",
//     cus_fax: "01711111111",
//     multi_card_name: "mastercard",
//     value_a: "ref001_A",
//     value_b: "ref002_B",
//     value_c: "ref003_C",
//     value_d: "ref004_D",
//     ipn_url: `${process.env.ROOT}/ssl-payment-notification`,
//   };

//   const sslcommerz = new SSLCommerzPayment(
//     process.env.STORE_ID,
//     process.env.STORE_PASSWORD,
//     false
//   ); //true for live default false for sandbox


//   sslcommerz.init(data).then((apiResponse ) => {
//     //process the response that got from sslcommerz
//     //https://developer.sslcommerz.com/doc/v4/#returned-parameters
//     let GatewayPageURL = apiResponse .GatewayPageURL
//     console.log(GatewayPageURL);
//     if (apiResponse ?.GatewayPageURL) {
//       return res.status(200).redirect(apiResponse ?.GatewayPageURL);
//     } else {
//       return res.status(400).json({
//         message: "Session was not successful",
//       });
//     }
//   });
// });

app.get('/init',async(req,res)=>{
  let sslcommerz = new SSLCommerz(settings);
  let post_body = {};
  post_body['total_amount'] = 150.25;
  post_body['currency'] = "BDT";
  post_body['tran_id'] = "transaction_id";
  post_body['success_url'] = "https://singularitybugfixing.herokuapp.com/success";
  post_body['fail_url'] = `${process.env.ROOT}/ssl-payment-fail`;
  post_body['cancel_url'] = `${process.env.ROOT}/ssl-payment-cancel`;
  post_body["ipn_url"]= 'https://singularitybugfixing.herokuapp.com/ipn',
  post_body['emi_option'] = 0;
  post_body['cus_name'] = "cus_name";
  post_body['cus_email'] = "cus_email";
  post_body['cus_phone'] = "cus_phone";
  post_body['cus_add1'] = "Dhaka";
  post_body['cus_city'] = "Dhaka";
  post_body['cus_country'] = "Bangladesh";
  post_body['shipping_method'] = "NO";
  post_body['multi_card_name'] = ""
  post_body['num_of_item'] = 1;
  post_body['product_name'] = "none";
  post_body['product_category'] = "none";
  post_body['product_profile'] = "general";
  let transaction_response = await sslcommerz.init_transaction(post_body)

console.log(transaction_response)
  //return transaction_response.GatewayPageURL
  if (transaction_response?.GatewayPageURL) {
    return res.status(200).redirect(transaction_response?.GatewayPageURL);
  } else {
    return res.status(400).json({
      message: "Session was not successful",
    });
  }

  //res.status(200).redirect(transaction_response.GatewayPageURL)
})

app.post("/success", async (req, res) => {
  console.log("req", req);
   res.status(200).json("");
});
app.post("/ssl-payment-fail", async (req, res) => {
  console.log(req.body);
  res.status(200).json(req.body);
});
app.post("/ssl-payment-cancel", async (req, res) => {
  console.log(req.body);
  res.status(200).json(req.body);
});
app.post("/ssl-payment-cancel", async (req, res) => {
  console.log(req.body);
  res.status(200).json(req.body);
});

// handling all (get,post,update,delete.....) unhandled routes
app.all("*", (req, res, next) => {
  //next(new AppError(`Can't find  on the server`, 404));
  res.status(400).json({
    message:"Can't find  on the server "
  })
});

// error handling middleware
app.use(globalErrorHandler);

module.exports = app;
