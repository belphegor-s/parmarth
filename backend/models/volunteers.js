const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = mongoose.model(
  "Volunteer",
  new Schema({
    name: String,
    course: String,
    branch: String,
    rollNumber: Number,
    postHolded: String,
  }),
  "volunteers",
);
