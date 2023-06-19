import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getProgessStorage } from '../helpers/progressRecipesStorage';

export default function StartRecipeButton(prop) {
  const [storage, setStorage] = useState();
  const history = useHistory();
  const { location: { pathname } } = history;

  const { type, id, recipe } = prop;

  useEffect(() => {
    getProgessStorage(type[1], setStorage, id);
  }, [recipe, id, type]);

  useEffect(() => {
    if (Array.isArray(storage) && storage.length > 0) {
      setStorage(true);
    } else {
      setStorage(false);
    }
  }, [storage]);

  return (
    <button
      type="button"
      data-testid="start-recipe-btn"
      className="start-recipe-btn"
      onClick={ () => history.push(`${pathname}/in-progress`) }
    >
      {!storage ? 'Start Recipe' : 'Continue Recipe'}
    </button>
  );
}
