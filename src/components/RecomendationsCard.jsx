import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import chooseURL from '../helpers/chooseURL';
import useApi from '../Hooks/useApi';
import './RecomendationsCard.css';

export default function RecomendationsCard({ type }) {
  const { pathname } = useLocation();
  const FIVE = 5;
  const recPath = pathname.includes('meals') ? '/drinks' : '/meals';
  const recType = type === 'meals' ? 'drinks' : 'meals';
  const str = type === 'meals' ? 'strDrink' : 'strMeal';
  const url = `${chooseURL(recType)}search.php?s=`;
  const data = useApi(url, recPath);

  let recomendations;

  if (data) recomendations = data[recType].filter((rec, index) => index <= FIVE);
  else recomendations = null;

  if (recomendations === null) return <p>Loading</p>;

  return (
    <div className="recomendations-card">
      { recomendations.map((rec, index) => (
        <div key={ index } data-testid={ `${index}-recommendation-card` }>
          <img width="50px" src={ rec[`${str}Thumb`] } alt={ rec[str] } />
          <p data-testid={ `${index}-recommendation-title` }>{rec[str]}</p>
        </div>
      ))}
    </div>
  );
}

RecomendationsCard.propTypes = {
  type: PropTypes.string.isRequired,
};
