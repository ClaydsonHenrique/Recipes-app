import React from 'react';
import { fireEvent, screen, userEvent, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';
import Login from '../pages/Login';
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

  test('Checks the disabled/enabled button dynamic', async () => {
    const { history } = renderWithRouterAndRedux(<Login />);
    const button = screen.getByRole('button', { name: /Enter/i,
    });

    expect(button).toBeDisabled();

    const inputEmail = 'teste@teste.com';
    const inputPassword = '1234567';

    const emailID = screen.getByTestId('email-input');
    const passwordID = screen.getByTestId('password-input');

    fireEvent.change(emailID, inputEmail);
    fireEvent.change(passwordID, inputPassword);

    await waitFor(() => {
      expect(button).toBeEnabled();
    });

    /* userEvent.click(button);
    const { pathname } = history.location;

    expect(pathname).tobe('/meals'); */
  });
});
