const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = mongoose.model(
  "EventVolunteer",
  new Schema({
    name: String,
    course: String,
    branch: String,
    event: String,
    rollNumber: Number,
    responsibility: String,
    academicYear: Number,
    certificateNumber: Number,
  }),
  "eventvolunteers",
);
