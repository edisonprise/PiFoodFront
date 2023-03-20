const { Router } = require("express");
const { Recipe, Diet } = require("../db");

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const { name,  image , summary,  /*score,*/  healthScore, steps, dietTypes } =
      req.body;
    const newRecipe = await Recipe.create({
      name,
      image,
      summary,
      //score,
      healthScore,
      steps,
    });

    let dietTypesRecipeDb = await Diet.findAll({
      where: { name: dietTypes },
    });
    newRecipe.setDiets(dietTypesRecipeDb);
    res.status(200).send(newRecipe);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
