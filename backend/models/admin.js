const mongoose = require("mongoose");
const Schema = mongoose.Schema;
module.exports = mongoose.model(
  "Admin",
  new Schema({
    email: String,
    password: String,
    status2FA: Boolean,
    userType: String,
  }),
  "admin",
);
