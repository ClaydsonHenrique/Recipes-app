import React, { useEffect, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Context from '../context/Context';

export default function FavoriteButton({ recipe, index = null }) {
  const { favorite, setFavorite } = useContext(Context);
  const storageData = localStorage.getItem('favoriteRecipes');
  const prevFavorites = useMemo(() => (storageData ? JSON.parse(storageData) : []), [
    storageData,
  ]);

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
    <button
      type="button"
      onClick={ handleFavoriteButton }
    >
      <img
        data-testid={ index !== null
          ? (`${index}-horizontal-favorite-btn`) : 'favorite-btn' }
        src={ favorite ? blackHeartIcon : whiteHeartIcon }
        alt="Heart Icon"
      />
    </button>
  );
}

FavoriteButton.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  index: PropTypes.number,
};
