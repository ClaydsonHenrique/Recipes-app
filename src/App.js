import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Provider from './context/Provider';
import rockGlass from './images/rockGlass.svg';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Header from './componentes/Header';
import Recipes from './pages/Recipes';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import NewRecipeDetails from './pages/NewRecipeDetails';
import NotFound from './pages/NotFound';
import MealsinProcess from './pages/MealsInProcess';
import DrinkInProcess from './pages/DrinkInProcess';

function App() {
  return (
    <Provider>
      <section>
        <Header />
        <Router>
          <span className="logo">TRYBE</span>
          <object
            className="rocksGlass"
            type="image/svg+xml"
            data={ rockGlass }
          >
            Glass
          </object>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/meals" component={ Recipes } />
            <Route exact path="/drinks" component={ Recipes } />
            <Route exact path="/profile" component={ Profile } />
            <Route exact component={ DoneRecipes } path="/done-recipes" />
            <Route exact component={ Header } path="/favorite-recipes" />
            <Route exact path="/meals/:id" component={ NewRecipeDetails } />
            <Route exact path="/drinks/:id" component={ NewRecipeDetails } />
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

        </Router>

      </section>
    </Provider>
  );
}
export default App;
