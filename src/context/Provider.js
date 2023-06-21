import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

export default function Provider({ children }) {
  const [appData, setAppData] = useState([]);
  const [title, setTitle] = useState('');
  const [renderSearch, setRenderSearch] = useState(false);
  const [category, setCategory] = useState('');
  const [renderByIngredient, setRenderByIngredient] = useState(false);
  const [ingredientsUrl, setIngredientsUrl] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [recipes, setRecipes] = useState([]);

  const contextValue = useMemo(() => ({
    recipes,
    setRecipes,
    appData,
    setAppData,
    title,
    setTitle,
    renderSearch,
    setRenderSearch,
    category,
    setCategory,
    renderByIngredient,
    setRenderByIngredient,
    ingredientsUrl,
    setIngredientsUrl,
    favorite,
    setFavorite,
  }), [
    recipes,
    setRecipes,
    appData,
    setAppData,
    title,
    setTitle,
    renderSearch,
    setRenderSearch,
    category,
    setCategory,
    renderByIngredient,
    setRenderByIngredient,
    ingredientsUrl,
    setIngredientsUrl,
    favorite,
    setFavorite,
  ]);

  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
