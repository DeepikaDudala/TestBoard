const express = require("express");
const dotenv = require("dotenv").config();
const app = require("./app");

//database
require("./database/connection");

//server
app.listen(process.env.PORT, () => {
  console.log(`server listening at port ${process.env.PORT}`);
});
