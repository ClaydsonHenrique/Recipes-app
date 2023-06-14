import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from 'redux';
import { render } from '@testing-library/react';
import reducer from '../redux/reducer';

const renderWithRouterAndRedux = (
  component,
  {
    initialState = {},
    store = createStore(reducer, initialState),
    initialEntries = ['/'],
    history,
  } = {},
) => {
  if (!history) {
    history = createMemoryHistory({ initialEntries });
  }

  return {
    ...render(
      <Router history={ history }>
        <Provider store={ store }>
          {component}
        </Provider>
      </Router>,
    ),
    history,
    store,
  };
};

export default renderWithRouterAndRedux;
