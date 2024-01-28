const express = require("express");
const app = express();
const morgan = require("morgan");
const usersRoutes = require("./routes/usersRoutes");
const cors = require("cors");
const testRoutes = require("./routes/testsRoutes");
const resultsRoutes = require("./routes/resultsRoutes");
const errorHandler = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
    methods: ["POST", "GET"],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(morgan("tiny"));

app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/tests", testRoutes);
app.use("/api/v1/results", resultsRoutes);

app.all("*", (req, res, next) => {
  res.status(500);
  throw new Error(`cannot find ${req.url}`);
});

app.use(errorHandler);
module.exports = app;
