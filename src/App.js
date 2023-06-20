import React from 'react';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipesDetails from './pages/RecipesDetails';
import NotFound from './pages/NotFound';
import MealsinProcess from './pages/MealsInProcess';
import DrinkInProcess from './pages/DrinkInProcess';

function App() {
  return (
    <Switch>
      <Route path="/meals/:id" exact component={ RecipesDetails } />
      <Route path="/drinks/:id" exact component={ RecipesDetails } />
      <Route
        path="/meals/:id/in-progress"
        exact
        component={ MealsinProcess }
      />
      <Route
        path="/drinks/:id/in-progress"
        exact
        component={ DrinkInProcess }
      />
      <Route path="/done-recipes" exact component={ DoneRecipes } />
      <Route path="/favorite-recipes" exact component={ FavoriteRecipes } />
      <Route component={ NotFound } />
    </Switch>
  );
}

export default App;
