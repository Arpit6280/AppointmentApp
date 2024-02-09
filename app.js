const path = require("path");
const cors = require("cors");

const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./util/database");
const User = require("./models/user");
const userAdmin = require("./controllers/user");

const app = express();

app.use(cors());

app.use(bodyParser.json({ extended: false }));

app.post("/add-users", userAdmin.addUsers);

app.get("/get-users", userAdmin.getUsers);

app.delete("/users/delete-user/:id", userAdmin.deleteUser);

sequelize
  .sync()
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
