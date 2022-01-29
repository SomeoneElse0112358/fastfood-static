const express = require("express");
const path = require("path");
const user = express();
const { users } = require("../db");

user.get("/login", (req, res) => {
  return res.sendFile("login.html", {
    root: path.join(__dirname, "../static/user"),
  });
});

user.get("/", async (req, res) => {
  console.log(req.session.user);
  const userCheck = await users.findOne({ email: req.session.user });
  if (!userCheck) return res.redirect("/login");

  return res.sendFile("index.html", {
    root: path.join(__dirname, "../static/user"),
  });
});

module.exports = user;
