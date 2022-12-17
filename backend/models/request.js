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
  postHolded: {
    type: String,
    required: true,
  },
  dataExist: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Request", requestSchema);
