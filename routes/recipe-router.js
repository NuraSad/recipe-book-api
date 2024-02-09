const express = require("express");

const RecipeCtrl = require("../controllers/recipe-ctrl");

const router = express.Router();

router.post("/recipes", RecipeCtrl.createRecipe);
router.put("/recipes/:id", RecipeCtrl.updateRecipe);
router.delete("/recipes/:id", RecipeCtrl.deleteRecipe);
router.get("/recipes/:id/", RecipeCtrl.getRecipeById);
router.get("/recipes/:id/:username", RecipeCtrl.checkLikedRecipe);
router.post("/recipes/:id/:username", RecipeCtrl.addFavouriteRecipe);
router.get("/recipes", RecipeCtrl.getRecipes);

module.exports = router;
