const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipe = new Schema(
  {
    name: String,
    meal: String,
    ingredients: [{ ingredient: String }],
    instructions: [{ step: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", recipe);
