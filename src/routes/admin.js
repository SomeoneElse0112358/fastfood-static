const express = require("express");
const path = require("path");
const admin = express();
const { admins, ObjectId } = require("../db");

admin.get("/login", (req, res) => {
  return res.sendFile("login.html", {
    root: path.join(__dirname, "../static/admin"),
  });
});

admin.get("/", async (req, res) => {
  const adminCheck = await admins.findOne({ email: req.session.admin });
  if (!adminCheck) return res.redirect("/admin/login");

  return res.sendFile("index.html", {
    root: path.join(__dirname, "../static/admin"),
  });
});

module.exports = admin;
