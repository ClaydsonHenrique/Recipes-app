import React from 'react';
import RecomendationCard from './RecomendationsCard';
import useApi from '../Hooks/useApi';
import createIngredientsArray from '../helpers/createIngredientsArray';
import chooseURL from '../helpers/chooseURL';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';
import StartRecipeButton from './StartRecipeButton';

export default function Details(prop) {
  const { pathname } = prop;
  const id = pathname.split('/')[2];
  const type = (pathname.split('/')[1] === 'meals') ? (
    ['meals', 'meals']) : ['drinks', 'cocktails'];
  const url = `${chooseURL(type[0])}lookup.php?i=${id}`;
  const data = useApi(url, pathname);
  const recipe = (data !== undefined) ? data[type[0]][0] : null;

  function renderRecipeCard() {
    if (!recipe) return <p>Loading</p>;

    const { strCategory, strArea, strInstructions, strYouTube } = recipe;
    const ingredients = createIngredientsArray(recipe);
    const recipeInfo = {
      id,
      type: (type[0] === 'meals') ? 'meals' : 'drink',
      nationality: strArea || '',
      category: strCategory,
      name: '',
      image: '',
      alcoholicOrNot: '' };
    if (type[0] === 'meals') {
      recipeInfo.name = recipe.strMeal;
      recipeInfo.image = recipe.strMealThumb;
    } else {
      recipeInfo.name = recipe.strDrink;
      recipeInfo.image = recipe.strDrinkThumb;
      recipeInfo.alcoholicOrNot = recipe.strAlcoholic;
    }
    const { name, image, alcoholicOrNot } = recipeInfo;
    return (
      <div>
        <img src={ image } width="390px" alt={ name } data-testid="recipe-photo" />
        <h2 data-testid="recipe-title">{ name }</h2>
        <ShareButton type={ type[0] } id={ id } />
        <FavoriteButton recipe={ recipeInfo } />
        <p data-testid="recipe-category">
          {`Category: ${strCategory} ${alcoholicOrNot}`}
        </p>
        <ul>
          Ingredients List:
          { ingredients.map((ingredient, index) => (
            <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              {`${ingredient.name} - ${ingredient.measure}`}
            </li>
          ))}
        </ul>
        <p data-testid="instructions">{ strInstructions }</p>
        { type[0] === 'meals' && (
          <video data-testid="video">
            <track default kind="captions" src="" />
            <source src={ strYouTube } />
          </video>
        )}

        <div>
          Recomendation Cards
          <RecomendationCard type={ type[0] } />
        </div>
        <StartRecipeButton type={ type } id={ id } recipe={ recipe } />
      </div>
    );
  }

  return (
    <div className="details-card">
      {renderRecipeCard()}
    </div>
  );
}
