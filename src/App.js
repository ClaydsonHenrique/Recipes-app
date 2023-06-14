import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import RecipeDetails from './pages/RecipeDetails';
import RecipesInProgress from './pages/RecipesInProgress';

function App() {
  return (
    <Router>
      <Route path="/meals/:id" component={ RecipeDetails } />
      <Route path="/drinks/:id" component={ RecipeDetails } />
      <Route path="/meals/:id/in-progress" component={ RecipesInProgress } />
      <Route path="/drinks/:id/in-progress" component={ RecipesInProgress } />
    </Router>
  );
}

export default App;
