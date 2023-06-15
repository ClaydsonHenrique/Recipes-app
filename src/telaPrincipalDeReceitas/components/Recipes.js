import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import '../../css/Header.css';
import Footer from '../../components/Footer';

const MAX_RECIPES = 12;
const MAX_CATEGORIES = 5;

function Recipes({ receitas }) {
  const { meals, drinks, mealCategories, drinkCategories } = useContext(RecipesContext);
  const location = useLocation();
  const history = useHistory();
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const recipes = location.pathname === '/meals' ? meals : drinks;
  const categories = location.pathname === '/meals' ? mealCategories : drinkCategories;

  useEffect(() => {
    if (selectedCategory) {
      const filterEndpoint = location.pathname === '/meals'
        ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
        : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;

      const fetchFilteredRecipes = async () => {
        try {
          const response = await fetch(filterEndpoint);
          const data = await response.json();
          setFilteredRecipes(data.meals || data.drinks);
        } catch (error) {
          console.error('Error fetching filtered recipes:', error);
        }
      };

      fetchFilteredRecipes();
    } else {
      setFilteredRecipes(recipes);
    }
  }, [selectedCategory, recipes, location.pathname]);

  const handleCategoryFilter = (category) => {
    setSelectedCategory((prevCategory) => (prevCategory === category ? '' : category));
  };

  const handleClearFilter = () => {
    setSelectedCategory('');
  };

  const handleRecipeClick = (recipeId) => {
    const recipeType = location.pathname === '/meals' ? 'meals' : 'drinks';
    history.push(`/${recipeType}/${recipeId}`);
  };

  return (
    <div>
      <h2>{location.pathname === '/meals' ? 'Meals' : 'Drinks'}</h2>
      <div>
        <h3>Categories</h3>
        <ul>
          <li>
            <button
              type="button"
              data-testid="All-category-filter"
              onClick={ handleClearFilter }
            >
              All
            </button>
          </li>
          {categories.slice(0, MAX_CATEGORIES).map((category, index) => (
            <li key={ index }>
              <button
                type="button"
                data-testid={ `${category.strCategory}-category-filter` }
                onClick={ () => handleCategoryFilter(category.strCategory) }
              >
                {category.strCategory}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <h3>Recipes</h3>
      <ul>
        {receitas.length === 0 ? (
          filteredRecipes.slice(0, MAX_RECIPES).map((recipe, index) => (
            <li key={ index } data-testid={ `${index}-recipe-card` }>
              <Link
                to={
                  location.pathname === '/meals'
                    ? `/meals/${recipe.idMeal}`
                    : `/drinks/${recipe.idDrink}`
                }
                onClick={ () => handleRecipeClick(recipe.idMeal || recipe.idDrink) }
                onKeyPress={ (event) => {
                  if (event.key === 'Enter') {
                    handleRecipeClick(recipe.idMeal || recipe.idDrink);
                  }
                } }
                tabIndex={ 0 }
                className="titulo-receitas"
              >
                <img
                  className="imagens-receitas"
                  src={ recipe.strMealThumb || recipe.strDrinkThumb }
                  alt={ recipe.strMeal || recipe.strDrink }
                  data-testid={ `${index}-card-img` }
                />
                <span data-testid={ `${index}-card-name` }>
                  {recipe.strMeal || recipe.strDrink}
                </span>
              </Link>
            </li>
          ))
        ) : (
          receitas.map((receita, index) => (
            <div key={ index } data-testid={ `${index}-recipe-card` }>
              <h3
                className="titulo-receitas"
                data-testid={ `${index}-card-name` }
              >
                {receita.strMeal ? receita.strMeal : receita.strDrink}

              </h3>
              <img
                className="imagens-receitas"
                data-testid={ `${index}-card-img` }
                src={ receita.strMealThumb
                  ? receita.strMealThumb : receita.strDrinkThumb }
                alt=""
              />
            </div>
          ))
        )}
      </ul>
      <Footer />
    </div>
  );
}
const mapStateToProps = (state) => ({
  receitas: state.receitas.receitas,
});

export default connect(mapStateToProps)(Recipes);
Recipes.propTypes = {
  receitas: PropTypes.arrayOf(PropTypes.arrayOf).isRequired,
};
