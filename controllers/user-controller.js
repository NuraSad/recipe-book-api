const UserProfile = require("../models/user-profile-model");
const Recipe = require("../models/recipe-model");

exports.UserProfile = async (req, res) => {
  const profile = await UserProfile.findOne({
    username: req.params.username,
  }).exec();
  const recipesID = profile.created;
  const favouriteID = profile.favourite;
  const recipes = await Recipe.find({ _id: { $in: recipesID } });
  const favouriteRecipes = await Recipe.find({ _id: { $in: favouriteID } });

  return res.status(200).json({
    success: true,
    data: { created: recipes, favourite: favouriteRecipes },
  });
};
