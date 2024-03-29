const Recipe = require("../models/recipe-model");
const UserProfile = require("../models/user-profile-model");

createRecipe = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a recipe",
    });
  }

  const recipe = new Recipe(body);

  if (!recipe) {
    return res.status(400).json({ success: false, error: err });
  }

  await UserProfile.findOne({ username: body.author }).then((profile, err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }

    profile.created.push(recipe._id);
    profile.save();
  });

  recipe
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: recipe._id,
        message: "Recipe created!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "Recipe not created!",
      });
    });
};

updateRecipe = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  Recipe.findOne({ _id: req.params.id }).then((recipe, err) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Recipe not found!",
      });
    }
    recipe.name = body.name;
    recipe.meal = body.meal;
    recipe.image = body.image;
    recipe.ingredients = body.ingredients;
    recipe.instructions = body.instructions;
    recipe.author = body.author;

    recipe
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: recipe._id,
          message: "Recipe updated!",
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: "Recipe not updated!",
        });
      });
  });
};

deleteRecipe = async (req, res) => {
  await Recipe.findOneAndDelete({ _id: req.params.id })
    .then((recipe, err) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }

      if (!recipe) {
        return res
          .status(404)
          .json({ success: false, error: `Recipe not found` });
      }

      UserProfile.findOne({ username: recipe.author }).then((profile, err) => {
        if (err) {
          return res.status(400).json({
            success: false,
            error: err,
          });
        }
        const recipes = profile.created;
        const idx = recipes.indexOf(recipe._id);
        recipes.splice(idx, 1);
        profile.created = recipes;
        profile.save();
      });

      return res.status(200).json({ success: true, data: recipe });
    })
    .catch((err) => console.log(err));
};

getRecipeById = async (req, res) => {
  await Recipe.findOne({ _id: req.params.id })
    .then((recipe, err) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }

      if (!recipe) {
        return res
          .status(404)
          .json({ success: false, error: `Recipe not found` });
      }
      return res.status(200).json({ success: true, data: recipe });
    })
    .catch((err) => console.log(err));
};

checkLikedRecipe = async (req, res) => {
  const profile = await UserProfile.findOne({
    username: req.params.username,
  }).exec();
  if (profile && profile.favourite.includes(req.params.id)) {
    return res.send(true);
  } else {
    return res.send(false);
  }
};

addOrRemoveFavouriteRecipe = async (req, res) => {
  const profile = await UserProfile.findOne({
    username: req.params.username,
  }).exec();
  if (profile) {
    if (!profile.favourite.includes(req.params.id)) {
      profile.favourite.push(req.params.id);
      profile.save().then(() => {
        return res.status(200).json({
          success: true,
          message: "Recipe successfully added!",
        });
      });
    } else {
      const recipes = profile.favourite;
      const idx = recipes.indexOf(req.params.id);
      recipes.splice(idx, 1);
      profile.favourite = recipes;
      profile.save().then(() => {
        return res.status(200).json({
          success: true,
          message: "Recipe successfully removed!",
        });
      });
    }
  } else {
    return res.status(404).json({
      success: false,
      message: "Failed the operation!",
    });
  }
};

getRecipes = async (req, res) => {
  await Recipe.find()
    .then((recipes, err) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      if (!recipes.length) {
        return res
          .status(404)
          .json({ success: false, error: `Recipes not found` });
      }
      return res.status(200).json({ success: true, data: recipes });
    })
    .catch((err) => console.log(err));
};

module.exports = {
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipes,
  getRecipeById,
  checkLikedRecipe,
  addOrRemoveFavouriteRecipe,
};
