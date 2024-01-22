const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipe = new Schema(
  {
    name: String,
    meal: String,
    author: String,
    image: String,
    ingredients: [String],
    instructions: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", recipe);
