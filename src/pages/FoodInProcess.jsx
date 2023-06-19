import React from 'react';
import { useLocation } from 'react-router-dom';
import RecipesInProgress from '../components/RecipesInProgress';

export default function FoodinProgress() {
  const { pathname } = useLocation();
  return (
    <RecipesInProgress pathname={ pathname } />
  );
}
