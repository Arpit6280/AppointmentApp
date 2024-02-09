const User = require("../models/user");
exports.getUsers = (req, res, next) => {
  User.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.addUsers = (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const phonenumber = req.body.phonenumber;
  User.create({
    username: username,
    email: email,
    phonenumber: phonenumber,
  })
    .then((result) => {
      res.status(200).send({ user: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteUser = (req, res, next) => {
  let userId = req.params.id;
  User.findByPk(userId)
    .then((user) => {
      return user.destroy();
    })
    .then((result) => {
      console.log("user deleted");
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
