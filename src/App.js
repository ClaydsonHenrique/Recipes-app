import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
/* import 'bootstrap/dist/css/bootstrap.min.css'; */
import Login from './pages/Login';
import Receitas from './pages/Receitas';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Receitas } />
      </Switch>
    </div>
  );
}

export default App;
