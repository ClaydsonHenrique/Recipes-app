import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import './RecipeDetails.css';
import copy from 'clipboard-copy';
import { verifyDoneRecipes,
  verifyInProgressRecipes, getValidIngredients } from '../helpers/recipeHelpers';

const MEALS = 'meals';
const DRINKS = 'drinks';

function RecipeDetails() {
  // Obtém o parâmetro 'id' da URL usando o hook useParams()
  const { id } = useParams();

  // Obtém o caminho atual da URL usando o hook useLocation()
  const { pathname } = useLocation();

  // Define os estados iniciais
  const [recipeData, setRecipeData] = useState([null]);
  const [ingredients, setIngredients] = useState([]);
  const [videoId, setVideoId] = useState('');
  const [recommendationData, setRecommendationData] = useState([]);
  const [copied, setCopied] = useState(false);
  const history = useHistory();
  // Setando provisoriamente as informações no localstorage
  localStorage
    .setItem('doneRecipes', JSON.stringify([{ id: '52908' }]));
  localStorage
    .setItem('inProgressRecipes', JSON
      .stringify({ meals: { 52771: [] }, drinks: { 178319: [] } }));

  // Define uma função para retornar a URL e tipo com base no caminho atual
  const getUrl = () => {
    if (pathname.includes(MEALS)) {
      return {
        type: MEALS,
        url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
        recommendationType: DRINKS,
        recommendationUrl:
          'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
      };
    }
    return {
      type: DRINKS,
      url: `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
      recommendationType: MEALS,
      recommendationUrl:
        'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    };
  };

  // Obtém a URL e tipo inicial usando a função getUrl()
  const [urlAndType] = useState(getUrl());

  // Executa o efeito sempre que a URL e tipo mudarem
  useEffect(() => {
    // Define uma função assíncrona para buscar os dados da receita
    const fetchRecipe = async () => {
      const response = await fetch(urlAndType.url);
      const data = await response.json();
      if (data[urlAndType.type]) {
        setRecipeData(data[urlAndType.type][0]);
      }
    };

    fetchRecipe();
  }, [urlAndType]);

  useEffect(() => {
    const validIngredients = getValidIngredients(recipeData);
    setIngredients(validIngredients);
  }, [recipeData]);

  // Executa o efeito sempre que o campo strYoutube dos dados da receita mudar
  useEffect(() => {
    if (recipeData.strYoutube) {
      const cut = 32;
      const newVideoId = recipeData.strYoutube.slice(cut);
      setVideoId(newVideoId);
    }
  }, [recipeData.strYoutube]);

  // Executa o efeito sempre que a URL e tipo de recomendação mudarem
  useEffect(() => {
    // Define uma função assíncrona para buscar as recomendações de bebidas
    const fetchDrinkRecommendations = async () => {
      const response = await fetch(urlAndType.recommendationUrl);
      const data = await response.json();
      setRecommendationData(data.drinks);
    };

    // Define uma função assíncrona para buscar as recomendações de refeições
    const fetchMealRecommendations = async () => {
      const response = await fetch(urlAndType.recommendationUrl);
      const data = await response.json();
      setRecommendationData(data.meals);
    };

    if (urlAndType.recommendationType === DRINKS) {
      fetchDrinkRecommendations();
    } else {
      fetchMealRecommendations();
    }
  }, [urlAndType.recommendationUrl, urlAndType.recommendationType]);

  // Mapeia os ingredientes para elementos JSX
  const ingredientElements = ingredients.map((item, index) => {
    const { ingredient, measure } = item;
    return (
      <li data-testid={ `${index}-ingredient-name-and-measure` } key={ ingredient }>
        {`${ingredient} - ${measure}`}
      </li>
    );
  });

  // Determina o tipo com base no tipo da URL
  const type = urlAndType.type === MEALS ? 'Meal' : 'Drink';

  // Define uma constante com o valor 6 para ser usada no recommendationData
  const six = 6;

  // Renderiza o componente RecipeDetails
  return (
    <div className="recipe-details">
      <h1 data-testid="recipe-title">{recipeData[`str${type}`]}</h1>
      <img
        src={ recipeData[`str${type}Thumb`] }
        alt={ `Recipe ${recipeData[`str${type}`]}` }
        data-testid="recipe-photo"
      />
      {urlAndType.type === MEALS ? (
        <p data-testid="recipe-category">{recipeData.strCategory}</p>
      ) : (
        <p data-testid="recipe-category">{recipeData.strAlcoholic}</p>
      )}
      <h2>Ingredients</h2>
      <ul data-testid="ingredients-list" className="ingredients-list">
        {ingredientElements.map((ingredient, index) => (
          <li key={ index }>{ingredient}</li>
        ))}
      </ul>
      <h2>Instructions</h2>
      <p data-testid="instructions">{recipeData.strInstructions}</p>
      <h2>Video</h2>
      <iframe
        data-testid="video"
        width="560"
        height="315"
        src={ `https://www.youtube.com/embed/${videoId}` }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media"
        allowFullScreen
      />
      <h2>Recommendations</h2>
      <ul className="recommendations">
        {recommendationData.slice(0, six).map((item, index) => (
          <li
            className="recommendation-card"
            key={ item.idDrink || item.idMeal }
            data-testid={ `${index}-recommendation-card` }
          >
            {item.strDrinkThumb && (
              <img src={ item.strDrinkThumb } alt={ `Drink ${item.strDrink}` } />
            )}
            {item.strMealThumb && (
              <img src={ item.strMealThumb } alt={ `Meal ${item.strMeal}` } />
            )}
            {item.strDrink && (
              <p data-testid={ `${index}-recommendation-title` }>
                {item.strDrink}
              </p>
            )}
            {item.strMeal && (
              <p data-testid={ `${index}-recommendation-title` }>
                {item.strMeal}
              </p>
            )}
          </li>
        ))}
      </ul>
      <div>
        {!verifyDoneRecipes() && !verifyInProgressRecipes()
      && (
        <button
          className="Fixed"
          data-testid="start-recipe-btn"
          onClick={ () => history.push(`/${urlAndType.type}/${id}/in-progress`) }
        >
          Start Recipe
        </button>)}
        {!verifyInProgressRecipes() && !verifyDoneRecipes()
      && (
        <button
          data-testid="start-recipe-btn"
          className="FixedRight"
        >
          Continue Recipe
        </button>
      ) }
        <button
          data-testid="share-btn"
          onClick={ () => {
            copy(document.location.href);
            setCopied(true);
          } }
        >
          Compartilhar
        </button>
        {copied && (<p>Link copied!</p>)}
        <button data-testid="favorite-btn">
          Favoritar
        </button>
      </div>
    </div>
  );
}
export default RecipeDetails;
