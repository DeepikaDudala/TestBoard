const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A result must have a student"],
  },
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test",
    required: [true, "A result must be associated with a test"],
  },
  total: {
    type: Number,
    ref: "Test",
  },
  scored: {
    type: Number,
    required: [true, "A score must be provided"],
  },
  percentage: {
    type: Number,
  },
});

module.exports = mongoose.model("Result", resultSchema);
