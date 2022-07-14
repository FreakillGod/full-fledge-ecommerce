require("dotenv").config({ path: "server/config/config.env" });
const cookieParser = require("cookie-parser");
const express = require("express");
const errorMiddleware = require("./middleware/error");
const cors = require("cors");
const fileupload = require("express-fileupload");

//security
// const helmet = require("helmet");
// const xss = require("xss-clean");
// const rateLimit = require("express-rate-limit");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileupload());

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
// app.set('trust proxy',1)
// app.use(
//   rateLimit({
//     windowMs: 15 * 60 * 1000,
//     max: 100,
//   })
// );
// app.use(helmet());
// app.use(xss());

//route
const product = require("./routes/products");
const user = require("./routes/user");
const order = require("./routes/order");
const payment = require("./routes/payment");

app.use("/api/v1", product);
app.use("/api/v1/auth", user);
app.use("/api/v1/", order);
app.use("/api/v1/", payment);

app.get("/", (req, res) => {
  res.status(200).json({ success: true });
});

//middleware
app.use(errorMiddleware);

module.exports = app;
