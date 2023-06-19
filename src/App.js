import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import rockGlass from './images/rockGlass.svg';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Header from './componentes/Header';
import RecipesProvider from './telaPrincipalDeReceitas/context/RecipesProvider';
import Recipes from './telaPrincipalDeReceitas/components/Recipes';
import DoneRecipes from './pages/DoneRecipes';
import RecipeDetails from './pages/RecipeDetails';
import FoodInProgress from './pages/FoodInProcess';
import DrinkInProcess from './pages/DrinkInProcess';

function App() {
  return (
    <section>
      <Header />
      <Router>
        <RecipesProvider>
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
            <Route path="/meals" component={ Recipes } />
            <Route path="/drinks" component={ Recipes } />
            <Route exact path="/profile" component={ Profile } />
            <Route exact component={ DoneRecipes } path="/done-recipes" />
            <Route exact component={ Header } path="/favorite-recipes" />
            <Route path="/meals/:id" component={ RecipeDetails } />
            <Route path="/drinks/:id" component={ RecipeDetails } />
            <Route
              path="/meals/:id/in-progress"
              exact
              component={ FoodInProgress }
            />
            <Route
              path="/drinks/:id/in-progress"
              exact
              component={ DrinkInProcess }
            />
          </Switch>

        </RecipesProvider>
      </Router>

    </section>
  );
}

export default App;
