import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';
import { renderWithRouterAndRedux } from '../helpers/renderwith';

describe('test login page features', () => {
  test('test if login renders', () => {
    renderWithRouterAndRedux(<App />);
    const history = createMemoryHistory();

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('if inputs are visible', () => {
    renderWithRouterAndRedux(<App />);
    screen.getByTestId('email-input');
    screen.getByTestId('password-input');
  });

  test('Checks the disabled/enabled button dynamic', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const button = screen.getByRole('button', { name: /Enter/i,
    });

    expect(button).toBeDisabled();

    const inputEmail = 'teste@teste.com';
    const inputPassword = '1234567';

    const emailID = screen.getByTestId('email-input');
    const passwordID = screen.getByTestId('password-input');

    userEvent.type(emailID, inputEmail);
    userEvent.type(passwordID, inputPassword);

    expect(button).toBeEnabled();

    userEvent.click(button);
    const { pathname } = history.location;

    expect(pathname).toBe('/meals');
  });
});
