import React from 'react';
import { useLocation } from 'react-router-dom';
import Process from '../components/Process';

export default function MealsinProcess() {
  const { pathname } = useLocation();
  return (
    <Process pathname={ pathname } />
  );
}
