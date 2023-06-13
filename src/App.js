import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import RecipeDetails from './pages/RecipeDetails';

function App() {
  return (
    <Router>
      <Route path="/meals/:id" component={ RecipeDetails } />
      <Route path="/drinks/:id" component={ RecipeDetails } />
    </Router>
  );
}

export default App;
