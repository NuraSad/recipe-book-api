const UserProfile = require("../models/user-profile-model");
const Recipe = require("../models/recipe-model");

exports.UserProfile = async (req, res) => {
  const profile = await UserProfile.findOne({
    username: req.params.username,
  }).exec();
  const recipesID = profile.created;
  const favouriteID = profile.favourite;
  const createdRecipeNames = [];
  const favouriteRecipesNames = [];
  if (recipesID.length > 0) {
    const recipes = await Recipe.find({ _id: { $in: recipesID } });
    recipes.forEach((recipe) => createdRecipeNames.push(recipe.name));
  }
  if (favouriteID.length > 0) {
    const favouriteRecipes = await Recipe.find({ _id: { $in: favouriteID } });
    favouriteRecipes.forEach((recipe) =>
      favouriteRecipesNames.push(recipe.name)
    );
  }

  return res.status(200).json({
    success: true,
    data: { created: createdRecipeNames, favourite: favouriteRecipesNames },
  });
};
