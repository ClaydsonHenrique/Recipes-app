import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from '../helpers/renderwith';

describe('test login page features', () => {
  test('test if login renders', () => {
    renderWithRouterAndRedux(<App />);
    const history = createMemoryHistory();
    renderWithRouterAndRedux(<App />);

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

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');

    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, '123456');

    expect(button).toBeEnabled();

    userEvent.click(button);
    const { pathname } = history.location;

    expect(pathname).tobe('/meals');
  });
});
