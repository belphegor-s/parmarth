const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const certificateSchema = new Schema({
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
    required: true,
  },
  postHolded: {
    type: String,
  },
  event: {
    type: String,
  },
  certificateNumber: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Certificate", certificateSchema);
