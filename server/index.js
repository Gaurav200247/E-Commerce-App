require("express-async-errors");

// security packages
const cors = require("cors");
const helmet = require("helmet");
const rateLimiter = require("express-rate-limit");
const xss = require("xss-clean");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "server/.env" });
}

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const ProductRouter = require("./Routes/ProductsRouter");
const UserRouter = require("./Routes/UserRouter");
const OrderRouter = require("./Routes/OrderRouter");
const PaymentRouter = require("./Routes/PaymentRouter");

const connectDB = require("./DB/connect");
const errHandlerMiddleware = require("./Middlewares/errHandler");
const notFoundMiddleware = require("./Middlewares/notFound");
const path = require("path");

// setting proxy to 1
app.set("trust proxy", 1);
// rate limitter
app.use(
  rateLimiter({
    windowMS: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);

// Extra Packages for api security
app.use(cors());
app.use(helmet());
app.use(xss());

// Middlewares
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(fileUpload());
app.use(cookieParser());

// Routes
app.use("/api/v1", ProductRouter);
app.use("/api/v1", UserRouter);
app.use("/api/v1", OrderRouter);
app.use("/api/v1", PaymentRouter);

// app.use(express.static(path.join(__dirname, "../client/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
// });

app.get("/", (req, res) => {
  res.send("Welcome E-comerce Mern Stack Project");
});

// Error Middlewares
app.use(notFoundMiddleware);
app.use(errHandlerMiddleware);

// listeners and DB connect
const port = process.env.PORT || 4000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(
        `Server is listening as http://localhost:${port}/ on port ${port}...`
      );
    });
  } catch (error) {
    console.log(error);
  }
};

start();
