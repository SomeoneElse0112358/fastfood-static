const { MongoClient, ObjectId } = require("mongodb");
const { database } = require("./config");
const client = new MongoClient(database.url);
const db = client.db(database.name);
const users = db.collection("users");
const admins = db.collection("admins");

module.exports = {
  client,
  users,
  admins,
  ObjectId,
};
