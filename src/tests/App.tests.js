import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { renderWithRouterAndRedux } from '../helpers/renderwith';
import App from '../App';
import Login from '../pages/Login';
import Footer from '../components/Footer';

describe('test login page features', () => {
  test('if login renders', () => {
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

  test('the disabled/enabled button dynamic', async () => {
    const { history, store } = renderWithRouterAndRedux(<Login />);

    const button = screen.getByTestId('login-submit-btn');

    expect(button).toBeDisabled();

    let inputEmail = 'teste@testecom';
    let inputPassword = '123';

    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();
    fireEvent.change(emailInput, { target: { value: inputEmail } });
    fireEvent.change(passwordInput, { target: { value: inputPassword } });
    expect(button).toBeDisabled();

    inputEmail = 'teste@teste.com';
    inputPassword = '1234567';

    fireEvent.change(emailInput, { target: { value: inputEmail } });
    fireEvent.change(passwordInput, { target: { value: inputPassword } });

    expect(button).toBeEnabled();

    fireEvent.click(button);
    expect(store.getState().email.email).toBe('{"email":"teste@teste.com"}');
    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals');
    });
  });

  test('the footer images renders', () => {
    renderWithRouterAndRedux(<Footer />);

    screen.getByAltText(/drink/i);
    screen.getByAltText(/meal/i);
  });
  it('should be a clickable image', async () => {
    const { history } = renderWithRouterAndRedux(<Footer />);

    const drinkImage = screen.getByTestId('drinks-bottom-btn');
    const mealImage = screen.getByTestId('meals-bottom-btn');

    fireEvent.click(drinkImage);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks');
    });

    fireEvent.click(mealImage);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals');
    });
  });
});
