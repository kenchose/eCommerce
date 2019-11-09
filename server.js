const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRouter = require("./server/config/routes/auth");
const orderRouter = require("./server/config/routes/order");
const apiRouter = require("./server/config/routes/api");
const productRouter = require("./server/config/routes/product");
const seederRouter = require("./server/config/routes/seeder");
const passport = require("passport");
const MongoStore = require("connect-mongo")(session);

app.use(
  session({
    secret: process.env.SECRET_SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    }),
    cookie: {
      maxAge: 200 * 60 * 1000 //200 mins
    }
  })
);
app.use(express.static(__dirname + "/dist/eCommerce"));

// // DB_CONNECTION
// mongoose.connect("mongodb://localhost/eCommerce", {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false
// });
// mongoose.connection.on("connected", () =>
//   console.log("Successfully connected to mongodb://localhost/eCommerce")
// );
mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});
mongoose.connection.on("connected", () =>
  console.log("Successfully connected to " + process.env.DB_CONNECT)
);
mongoose.connection.on("error", error =>
  console.log("Error, cannot connec to DB ===> " + error)
);

//MIDDLEWARE
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(morgan("dev"));

//ROUTERS
app.use("/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api", apiRouter);
app.use("/api/order", orderRouter);
app.use("/seeder", seederRouter);
app.all("*", (req, res, next) => {
  res.sendFile(path.resolve("./dist/eCommerce/index.html"));
});

app.listen(8000, () => console.log("Listening on port 8000"));
