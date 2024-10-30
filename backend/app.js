const connectDB = require("./config/db");
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();
const cors = require("cors");
const setupSwaggerDocs = require("./swagger");

const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const sharedRoutes = require("./routes/sharedRoutes");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
setupSwaggerDocs(app);

//Connect to MongoDB
connectDB();

app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/user", sharedRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", profileRoutes);
// app.use("/api/vi/user", sharedRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Precious me2mentorApp!");
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500).send({
//     message: res.locals.error,
//   });
// });

// Error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);

  if (err.name === "JsonWebTokenError") {
    return res.status(401).send({
      message: "Invalid token",
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).send({
      message: "Token expired",
    });
  }

  res.status(err.status || 500).send({
    message: err.message || "An internal server error occurred",
  });
});

module.exports = app;
