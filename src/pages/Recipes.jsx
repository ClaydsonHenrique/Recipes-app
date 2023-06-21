import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import {
  fetchDrinks,
  fetchMeals,
  fetchDrinkCategories,
  fetchMealCategories,
  fetchDrinksByCategory,
  fetchMealsByCategory,
} from '../helpers/fetchFunctions';
import Footer from '../components/Footer';

const MAX_RECIPES = 12;
const MAX_CATEGORIES = 5;

function Recipes() {
  const { recipes, setRecipes } = useContext(Context);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      let firstTwelveRecipes;
      let fetchedCategories;
      if (window.location.pathname === '/drinks') {
        const drinks = await fetchDrinks();
        firstTwelveRecipes = drinks.slice(0, MAX_RECIPES);
        fetchedCategories = await fetchDrinkCategories();
      } else {
        const meals = await fetchMeals();
        firstTwelveRecipes = meals.slice(0, MAX_RECIPES);
        fetchedCategories = await fetchMealCategories();
      }
      setRecipes(firstTwelveRecipes);
      setCategories(fetchedCategories);
    };

    fetchData();
  }, [setRecipes]);

  const handleCategoryFilter = async (category) => {
    if (category === selectedCategory) {
      setSelectedCategory('');
      let unfilteredRecipes;
      if (window.location.pathname === '/drinks') {
        unfilteredRecipes = await fetchDrinks();
      } else {
        unfilteredRecipes = await fetchMeals();
      }
      setRecipes(unfilteredRecipes.slice(0, MAX_RECIPES));
    } else {
      setSelectedCategory(category);
      let filteredRecipes;
      if (window.location.pathname === '/drinks') {
        if (category === 'All') {
          filteredRecipes = await fetchDrinks();
        } else {
          filteredRecipes = await fetchDrinksByCategory(category);
        }
      } else if (category === 'All') {
        filteredRecipes = await fetchMeals();
      } else {
        filteredRecipes = await fetchMealsByCategory(category);
      }
      setRecipes(filteredRecipes.slice(0, MAX_RECIPES));
    }
  };

  const navigateToRecipeDetails = (recipe) => {
    const recipeId = recipe.idMeal || recipe.idDrink;
    const path = window.location.pathname.includes('/drinks')
      ? `/drinks/${recipeId}`
      : `/meals/${recipeId}`;
    history.push(path);
  };

  return (
    <div>
      <div>Receitas</div>
      <div>
        {categories.slice(0, MAX_CATEGORIES).map((category, index) => (
          <button
            key={ index }
            data-testid={ `${category}-category-filter` }
            onClick={ () => handleCategoryFilter(category) }
            className={ selectedCategory === category ? 'selected' : '' }
          >
            {category}
          </button>
        ))}
        <button
          data-testid="All-category-filter"
          onClick={ () => handleCategoryFilter('All') }
          className={ selectedCategory === 'All' ? 'selected' : '' }
        >
          All
        </button>
      </div>
      <div>
        {recipes.map((recipe, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
            className="recipe-card"
            role="button"
            tabIndex={ 0 }
            onClick={ () => navigateToRecipeDetails(recipe) }
            onKeyPress={ (event) => {
              if (event.key === 'Enter') {
                navigateToRecipeDetails(recipe);
              }
            } }
          >
            <img
              src={ recipe.strMealThumb || recipe.strDrinkThumb }
              alt="Recipe"
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>
              {recipe.strMeal || recipe.strDrink}
            </p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Recipes;
