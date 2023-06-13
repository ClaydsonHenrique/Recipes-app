import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { renderWithRouterAndRedux } from '../helpers/renderwith';
import App from '../App';
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

  test('the disabled/enabled button dynamic', () => {
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

  test('the footer images renders', () => {
    renderWithRouterAndRedux(<Footer />);

    screen.getByAltText(/drink/i);
    screen.getByAltText(/meal/i);
  });
  it('should be a clickable image', () => {
    const history = createMemoryHistory();
    renderWithRouterAndRedux(<Footer />);

    const drinkImage = screen.getByTestId('drinks-bottom-btn');
    const mealImage = screen.getByTestId('meals-bottom-btn');

    const { pathname } = history.location;

    userEvent.click(drinkImage);
    expect(pathname).toBe('/drinks');

    userEvent.click(mealImage);
    expect(pathname).toBe('/meals');
  });
});
