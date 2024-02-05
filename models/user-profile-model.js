const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userProfile = new Schema({
  username: String,
  created: [String],
  favourite: [String],
});

module.exports = mongoose.model("UserProfile", userProfile);
