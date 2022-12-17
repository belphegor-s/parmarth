const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rteSchema = new Schema({
  studentName: {
    type: String,
    required: true,
  },
  classStudying: {
    type: String,
    // required: true,
  },
  school: {
    type: String,
    required: true,
  },
  academicYear: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Rte", rteSchema);
