import React from "react";
import CocktailImage from "./CocktailImage";
import CocktailItem from "./CocktailItem";
import { useHttp } from "../../src/hooks/Http";

export default function CocktailCard() {
  const [cocktails, setCocktails] = useHttp(
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic",
    []
  );

  return cocktails !== null
    ? cocktails.drinks.map(cocktail => (
        <React.Fragment key={cocktail.idDrink}>
          <CocktailImage image={cocktail.strDrinkThumb} />
          <CocktailItem item={cocktail} />
        </React.Fragment>
      ))
    : console.log("");
}