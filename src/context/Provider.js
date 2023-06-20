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
  const [nationality, setNationality] = useState('All');
  const [favorite, setFavorite] = useState(false);

  const contextValue = useMemo(
    () => ({
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
      nationality,
      setNationality,
      favorite,
      setFavorite,
    }),
    [appData,
      title,
      renderSearch,
      category,
      renderByIngredient,
      ingredientsUrl,
      nationality,
      favorite],
  );

  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
