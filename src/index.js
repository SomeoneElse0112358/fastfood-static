const express = require("express");
const { ValidationError } = require("express-validation");
const session = require("express-session");
const path = require("path");
const mongoStore = require("connect-mongo");
const app = express();
const { client } = require("./db");
const routes = require("./routes");
const { database, port, secretSession } = require("./config");

app.use(
  session({
    secret: secretSession,
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({
      mongoUrl: database.url,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(express.static(path.join(__dirname, "static/"), { index: false }));

app.use(routes);

app.use(function (err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }
  console.log(err);
  return res.status(500).json(err);
});

app.listen(port, async () => {
  console.log(`Server has been started on port ${port}...`);
  client.connect().then(() => console.log(`Database has been connected...`));
});
