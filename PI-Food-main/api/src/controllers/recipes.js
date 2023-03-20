const axios = require("axios");
const db = require("../db");
const { Diet, Recipe } = require("../db");
const { API_KEY, API_KEY1 } = process.env;

const getApiInfo = async () => {
  const apiUrl = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  );
  const apiInfo = await apiUrl.data.results.map((e) => {
    return {
      id: e.id,
      image: e.image,
      name: e.title,
      dietTypes: e.diets,
      summary: e.summary,
      //score: e.score,
      healthScore: e.healthScore,
      dishTypes: e.dishTypes,
      steps: e.analyzedInstructions[0]?.steps.map((e) => {
        return e.step;
      }),
    };
  });
   apiInfo.forEach((el) => {
    Recipe.findOrCreate({
      where: {
        name: el.name,
        image: el.image,
        summary: el.summary,
        //score: el.score,
        healthScore: el.healthScore,
        steps: el.steps != undefined ? el.steps : [],
      },
    });
  }); 
  return apiInfo;
};

const getDbInfo = async () => {
  return await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getApiById = async (id) => {
  return await axios.get(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
  );
};
const getDbById = async (id) => {
  return await Recipe.findByPk(id, {
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllRecipes = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const totalInfo = apiInfo.concat(dbInfo);
  return totalInfo;
};

module.exports = {
  getApiInfo,
  getDbInfo,
  getAllRecipes,
  getDbById,
  getApiById,
};
