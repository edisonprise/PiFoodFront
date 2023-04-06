const { Router } = require("express");
const { Recipe, Diet } = require("../db");

const router = Router();
router.delete("/delete/:id", async function (req, res) {
  let id = req.params.id;
  let recipesDestroyed = Recipe.destroy({
    where: {
      id: id,
    },
  });
  if (recipesDestroyed) {
    res.status(200).send(true);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const { name, image, summary, healthScore, steps, dietTypes } =
      req.body;
    const newRecipe = await Recipe.create({
      name,
      image,
      summary,
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
