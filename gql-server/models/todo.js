const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const todoSchema = new Schema({
  summary: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  last_updated: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("TODO", todoSchema);
