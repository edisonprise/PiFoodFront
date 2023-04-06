import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecipes,
  dietTypeFilter,
  alphabeticalSort,
  scoreSort,
} from "../actions";
import Recipe from "./Recipe";
import { Link } from "react-router-dom";
import Paged from "./Paged";
import SearchBar from "./SearchBar";
import "./css/home.css";

let prevId = 1;

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);

  const [order, setOrder] = useState("");

  const [page, setPage] = useState(1);
  const [recipesPage, setRecipesPage] = useState(9);

  const quantityRecipesPage = page * recipesPage;
  const firstRecipePage = quantityRecipesPage - recipesPage;
  const showRecipesPage = allRecipes.slice(
    firstRecipePage,
    quantityRecipesPage
  );

  const paged = function (pageNumber) {
    setPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
    setPage(1);
  }

  function handleDietTypeFilter(e) {
    e.preventDefault();
    dispatch(dietTypeFilter(e.target.value));
    setPage(1);
  }

  function handleAlphabeticalSort(e) {
    e.preventDefault();
    dispatch(alphabeticalSort(e.target.value));
    setPage(1);
    setOrder(`Order ${e.target.value}`);
  }

  function handleScoreSort(e) {
    e.preventDefault();
    dispatch(scoreSort(e.target.value));
    setPage(1);
    setOrder(`Order ${e.target.value}`);
  }

  return (
    <div className="home">
      <h1 className="initialMsg">Lets's do it!</h1>
      <div>
        <button className="refreshButton" onClick={handleClick}>
          Refresh recipes
        </button>
        <Link to="/recipe">
          <button className="addButton">Add new Recipe</button>
        </Link>
      </div>
      <div className="select">
        <label className="filters">Sort</label>
        <select
          className="select"
          name="alphabetical"
          onChange={(e) => handleAlphabeticalSort(e)}
        >
          <option disabled selected>
            Alphabetical
          </option>
          <option value="atoz">A to Z</option>
          <option value="ztoa">Z to A</option>
        </select>
        <select
          className="select"
          name="numerical"
          onChange={(e) => handleScoreSort(e)}
        >
          <option disabled selected>
            Score
          </option>
          <option value="asc">From Min to Max</option>
          <option value="desc">From Max to Min</option>
        </select>
        <label className="filters">Diet Types</label>
        <select
          className="select"
          name="diets"
          onChange={(e) => handleDietTypeFilter(e)}
        >
          <option disabled selected>
            Select...
          </option>
          <option value="gluten Free">Gluten Free</option>
          <option value="keto">Keto</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="ovo-Vegetarian">Ovo-Vegetarian</option>
          <option value="lacto-Vegetarian">Lacto-Vegetarian</option>
          <option value="lacto ovo vegetarian">Lacto ovo vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="pescetarian">Pescetarian</option>
          <option value="low foodmap">Low FODMAP</option>
          <option value="whole30">Whole30</option>
          <option value="primal">Primal</option>
          <option value="dairy Free">Dairy Free</option>
          <option value="paleo">Paleo</option>
        </select>
      </div>

      <Paged
        recipesPage={recipesPage}
        allRecipes={allRecipes.length}
        paged={paged}
      />

      <SearchBar />

      <div className="allrecipes">
        {showRecipesPage?.map((e) => {
          return (
            <div className="eachRecipe" key={prevId++}>
              <Link className="linkRecetas" to={`detail/${e.id}`}>
                <Recipe
                  image={
                    e.image
                      ? e.image
                      : "https://images.unsplash.com/photo-1635321593217-40050ad13c74?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1748&q=80"
                  }
                  name={e.name}
                  dietTypes={e.dietTypes}
                />
              </Link>
            </div>
          );
        })}
      </div>

      <Paged
        recipesPage={recipesPage}
        allRecipes={allRecipes.length}
        paged={paged}
      />
    </div>
  );
}
