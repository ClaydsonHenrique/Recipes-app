import React, { useState, useEffect, useMemo } from 'react';
import RecomendationCard from './RecomendationsCard';
import useApi from '../Hooks/useApi';
import createIngredientsArray from '../helpers/createIngredientsArray';
import chooseURL from '../helpers/chooseURL';
import test from '../helpers/test';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';
import FinishRecipeButton from './FinishRecipeButton';
import { progessStorage, getProgessStorage } from '../helpers/progressRecipesStorage';

export default function Process(prop) {
  const { pathname } = prop;
  const id = pathname.split('/')[2];
  const type = useMemo(() => ((pathname.split('/')[1] === 'meals') ? (
    ['meals', 'meals']) : ['drinks', 'cocktails']), [pathname]);
  const url = `${chooseURL(type[0])}lookup.php?i=${id}`;
  const data = useApi(url, pathname);
  const [selectedIngredient, setSelectedIngredient] = useState([]);
  const recipe = (data !== undefined) ? data[type[0]][0] : null;
  const [ingredientList, setIngredientList] = useState([]);

  useEffect(() => {
    if (recipe) setIngredientList(createIngredientsArray(recipe));
  }, [recipe, id]);

  useEffect(() => {
    getProgessStorage(type[1], setSelectedIngredient, id);
  }, [type, setSelectedIngredient, id]);

  useEffect(() => {
    progessStorage(type[1], selectedIngredient, id);
  }, [type, selectedIngredient, id]);

  // Função para adicionar a comida feita no localStorage
  const addToLocalStorage = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const newRecipe = {
      id,
      type: type[1],
      area: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe.strMeal || recipe.strDrink || '',
      image: recipe.strMealThumb || recipe.strDrinkThumb || '',
      doneDate: new Date().toLocaleDateString(),
      tags: recipe.strTags ? recipe.strTags.split(',') : [],
    };

    doneRecipes.push(newRecipe);
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  };

  function checkedTest({ target }) {
    if (target.checked) {
      setSelectedIngredient([...selectedIngredient, target.name]);
    } else {
      setSelectedIngredient(selectedIngredient.filter(
        (ingredient) => ingredient !== target.name,
      ));
    }
  }

  function list(ingredients) {
    return ingredients.map((ingredient, index) => (
      <li
        style={
          selectedIngredient.includes(ingredient.name)
            ? { textDecoration: 'line-through solid rgb(0, 0, 0)' }
            : { textDecoration: 'none' }
        }
        key={ index }
        data-testid={ `${index}-ingredient-step` }
        name={ ingredient.name }
      >
        <input
          type="checkbox"
          checked={ selectedIngredient.includes(ingredient.name) }
          onChange={ (event) => checkedTest(event) }
          name={ ingredient.name }
        />
        {`${ingredient.name} - ${ingredient.measure}`}
      </li>
    ));
  }

  function renderRecipeCard() {
    if (!recipe) return <p>Loading</p>;

    const { strCategory, strInstructions, strYouTube } = recipe;
    const { name, image } = test(recipe, type[0], id);

    return (
      <div>
        <img src={ image } alt={ name } data-testid="recipe-photo" />
        <h2 data-testid="recipe-title">{name}</h2>
        <ShareButton type={ type[0] } id={ id } />
        <FavoriteButton recipe={ test(recipe, type[0], id) } />
        <p data-testid="recipe-category">{`Category: ${strCategory}`}</p>
        <ul>
          Ingredients List:
          {list(ingredientList)}
        </ul>
        <p data-testid="instructions">{strInstructions}</p>
        {type[0] === 'meals' && (
          <video data-testid="video">
            <track default kind="captions" src="" />
            <source src={ strYouTube } />
          </video>
        )}

        <div>
          Recomendation Cards
          <RecomendationCard type={ type[0] } />
        </div>
        <FinishRecipeButton
          ingredientList={ ingredientList }
          selectedIngredient={ selectedIngredient }
          recipe={ recipe }
          type={ type[1] }
          id={ id }
          addToLocalStorage={ addToLocalStorage }
        />
      </div>
    );
  }

  return (
    <div className="details-card">
      {renderRecipeCard()}
    </div>
  );
}
