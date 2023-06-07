import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
/* import 'bootstrap/dist/css/bootstrap.min.css'; */
import Login from './pages/Login';
import Receitas from './pages/Receitas';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Receitas } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/profile" component={ Profile } />
      </Switch>
    </div>
  );
}

export default App;
