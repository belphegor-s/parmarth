const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  rollNumber: {
    type: Number,
    required: true,
  },
  purpose: {
    type: String,
    require: true,
  },
  postHolded: {
    type: String,
  },
  event: {
    type: String,
  },
  dataExist: {
    type: Boolean,
    required: true,
  },
  academicYear: {
    type: Number,
  },
});

module.exports = mongoose.model("Request", requestSchema);
