import React from "react";
import { useHttp } from "../hooks/Http";
import CocktailDetailsImage from "./CocktailDetailsImage";
import Ingredients from "./Ingredients";
import CircularProgress from "./CircularProgress";

export default function CocktailDetails(props) {
  const [cocktail, setCocktail] = useHttp(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${props.id.match.params.id}`,
    []
  );

  const getIngredients = () => {
    let cocktailArray = cocktail.data.drinks[0];
    let ingredients = [];
    let measurements = [];
    for (let key in cocktailArray) {
      if (key.startsWith("strIngredient") && cocktailArray[key] !== null) {
        ingredients.push(cocktailArray[key]);
      } else if (key.startsWith("strMeasure") && cocktailArray[key] !== null) {
        measurements.push(cocktailArray[key]);
      }
    }
    return { ing: ingredients, measure: measurements };
  };

  return cocktail === null ? (
    <div>
      <CircularProgress />
    </div>
  ) : (
    <div>
      <div>
        {cocktail.data.drinks.map(drink => (
          <div>
            <div>
              <CocktailDetailsImage image={drink.strDrinkThumb} />
            </div>
            <div>
              <div>Name: {drink.strDrink}</div>
              <div>Category: {drink.strCategory}</div>
              <div>IBA: {drink.strIBA === null ? "-" : drink.strIBA}</div>
              <div>Serve in: {drink.strGlass}</div>
              <div>Ingredients: </div>
              <Ingredients tag={"Ingredients: "} data={getIngredients().ing} />
              <div>Measurements: </div>
              <Ingredients data={getIngredients().measure} />
              <div>Instructions: {drink.strInstructions}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
