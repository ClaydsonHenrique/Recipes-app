import React, { useEffect, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Context from '../context/Context';

const DEFAULT_INDEX = 1000;

export default function FavoriteButton({ recipe, index = DEFAULT_INDEX }) {
  const { favorite, setFavorite } = useContext(Context);
  const prevFavorites = useMemo(() => {
    const storageData = localStorage.getItem('favoriteRecipes');
    return storageData ? JSON.parse(storageData) : [];
  }, []);

  useEffect(() => {
    const isAlreadyFavorite = prevFavorites.some((favRec) => favRec.id === recipe.id);
    if (isAlreadyFavorite) setFavorite(true);
  }, [recipe, prevFavorites, setFavorite]);

  const handleFavoriteButton = () => {
    if (!favorite) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...prevFavorites, recipe]));
    } else {
      const newFavorites = prevFavorites.filter((rec) => rec.id !== recipe.id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    }
    setFavorite((prevState) => !prevState);
  };

  return (
    <button type="button" onClick={ handleFavoriteButton }>
      <img
        data-testid={ index !== DEFAULT_INDEX
          ? `${index}-horizontal-favorite-btn` : 'favorite-btn' }
        src={ favorite ? blackHeartIcon : whiteHeartIcon }
        alt="Heart Icon"
      />
    </button>
  );
}

FavoriteButton.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    type: PropTypes.string.isRequired,
    // Add other required properties of the recipe object
  }).isRequired,
  index: PropTypes.number,
};
