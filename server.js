const express = require("express");
const logger = require("morgan");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const questionRoutes = require("./routes/questionRoutes");
const answerRoutes = require("./routes/answerRoutes");
const commentsRoutes = require("./routes/commentRoutes");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  logger(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens["response-time"](req, res),
      "ms",
    ].join(" ");
  })
);

// MongoDB Connection

connectDB();

// Routes

app.use("/user", userRoutes);

app.use("/question", questionRoutes);

app.use("/answer", answerRoutes);

app.use("/comments", commentsRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));

  app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(
    "Server Started in " +
      process.env.NODE_ENV +
      " mode Successfully on " +
      port
  );
});
