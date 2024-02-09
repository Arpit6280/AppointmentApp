//sequelize

const Sequelize = require("sequelize");
// db name      //user     //password
const sequelize = new Sequelize("appointment", "root", "12345678", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
