import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './componentes/Header';

class App extends React.Component {
  render() {
    return (
      <div className="meals">
        <Switch>
          <Route exact component={ Header } path="/meals" />
          <Route exact component={ Header } path="/drinks" />
          <Route exact component={ Header } path="/profile" />
          <Route exact component={ Header } path="/done-recipes" />
          <Route exact component={ Header } path="/favorite-recipes" />
        </Switch>
      </div>
    );
  }
}

export default App;
