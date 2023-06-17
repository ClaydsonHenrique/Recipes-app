import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

const MAX_RECIPES = 12;
const MAX_CATEGORIES = 5;

function RecipesProvider({ children }) {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [mealCategories, setMealCategories] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);

  const fetchMeals = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      setMeals(data.meals.slice(0, MAX_RECIPES));
    } catch (error) {
      console.error('Error fetching meals:', error);
    }
  };

  const fetchDrinks = async () => {
    try {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      setDrinks(data.drinks.slice(0, MAX_RECIPES));
    } catch (error) {
      console.error('Error fetching drinks:', error);
    }
  };

  const fetchMealCategories = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      setMealCategories(data.meals.slice(0, MAX_CATEGORIES));
    } catch (error) {
      console.error('Error fetching meal categories:', error);
    }
  };

  const fetchDrinkCategories = async () => {
    try {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      setDrinkCategories(data.drinks.slice(0, MAX_CATEGORIES));
    } catch (error) {
      console.error('Error fetching drink categories:', error);
    }
  };

  useEffect(() => {
    fetchMeals();
    fetchDrinks();
    fetchMealCategories();
    fetchDrinkCategories();
  }, []);

  const value = useMemo(() => ({ meals, drinks, mealCategories, drinkCategories }), [
    meals,
    drinks,
    mealCategories,
    drinkCategories,
  ]);

  return (
    <RecipesContext.Provider value={ value }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
