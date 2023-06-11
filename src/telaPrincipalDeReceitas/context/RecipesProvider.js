import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

const MAX_RECIPES = 12;

function RecipesProvider({ children }) {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);

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

  useEffect(() => {
    fetchMeals();
    fetchDrinks();
  }, []);

  const value = useMemo(() => ({ meals, drinks }), [meals, drinks]);

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
