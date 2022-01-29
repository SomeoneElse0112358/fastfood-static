const express = require("express");
const static = express();
const adminRouter = require("./admin");
const userRouter = require("./user");

static.use("/admin", adminRouter);
static.use("/", userRouter);

module.exports = static;
