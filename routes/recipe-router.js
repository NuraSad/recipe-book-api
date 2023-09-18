const express = require("express");

const RecipeCtrl = require("../controllers/recipe-ctrl");

const router = express.Router();

router.post("/recipe", RecipeCtrl.createRecipe);
router.put("/recipe/:id", RecipeCtrl.updateRecipe);
router.delete("/recipe/:id", RecipeCtrl.deleteRecipe);
router.get("/recipe/:id", RecipeCtrl.getRecipeById);
router.get("/recipes", RecipeCtrl.getRecipes);

module.exports = router;
