import React from 'react';
import { useLocation } from 'react-router-dom';
import Details from '../components/Details';

export default function RecipesDetails() {
  const { pathname } = useLocation();
  return (
    <div className="details-card">
      <Details pathname={ pathname } />
    </div>
  );
}
