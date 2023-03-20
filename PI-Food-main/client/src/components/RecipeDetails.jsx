import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetails } from "../actions";
import { Link } from "react-router-dom";


export default function RecipeDetails(props) {
    const dispatch = useDispatch();
    const id = props.match.params.id;

    useEffect(() => {
        dispatch(getRecipeDetails(id))
    },[dispatch, id]);

    const recipeDetails = useSelector(state => state.recipeDetails);  // lo traigo del reducer

    return (
        <div>
            <div>
                <img src={recipeDetails.image ?
                recipeDetails.image :
            'https://images.unsplash.com/photo-1635321593217-40050ad13c74?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1748&q=80'} alt="Pic not found"/>
            </div>

            <h1>{recipeDetails.name}</h1>

            {recipeDetails.dishTypes ?
            <div>
                <h2>Dish Type</h2>
                {recipeDetails.dishTypes?.map(e => {
                    return(
                        <h2>{e}</h2>
                    )
                })}
            </div> : 
            <br />
            }

            <div>
                <h2>Diet Type</h2>
                {recipeDetails.dietTypes ? recipeDetails.dietTypes.map(e => {
                    return(
                        <h2>{e.name}</h2>
                    )
                }) : 
                recipeDetails.diets?.map(e => {
                    return(
                        <h2>{e.name}</h2>
                    )
                })}
            </div>

            <div>
                <h3>Healthiness points: {recipeDetails.healthScore}</h3>
            </div>

            <div>
                <h3>Steps: </h3>
                <ul>{Array.isArray(recipeDetails.steps) ? recipeDetails.steps.map(e => {
                    return(
                        <li>{e.step}</li>
                    )
                }) :
                <li>{recipeDetails.steps}</li>
            }</ul>
            </div>
            <Link to="/home"><button>Go back to recipes</button></Link>
        </div>
    )
}