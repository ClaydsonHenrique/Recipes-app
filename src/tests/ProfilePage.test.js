import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Profile from '../pages/Profile';

describe('Profile', () => {
  test('renders profile page with email', () => {
    const userEmail = 'example@example.com';
    localStorage.setItem('user', JSON.stringify({ email: userEmail }));

    render(<Profile />);

    const emailElement = screen.getByTestId('profile-email');
    expect(emailElement).toBeInTheDocument();
    expect(emailElement.textContent).toContain(userEmail);
  });

  test('redirects to done recipes page when "Done Recipes" button is clicked', () => {
    const history = createMemoryHistory();
    const pushSpy = jest.spyOn(history, 'push');
    render(
      <Router history={ history }>
        <Profile />
      </Router>,
    );

    const doneRecipesButton = screen.getByTestId('profile-done-btn');
    fireEvent.click(doneRecipesButton);

    expect(pushSpy).toHaveBeenCalledWith('/done-recipes');
  });

  test('clears localStorage and redirects to login page when "Logout" button is clicked', () => {
    localStorage.setItem('user', JSON.stringify({ email: 'example@example.com' }));
    const history = createMemoryHistory();
    const pushSpy = jest.spyOn(history, 'push');
    render(
      <Router history={ history }>
        <Profile />
      </Router>,
    );

    const logoutButton = screen.getByTestId('profile-logout-btn');
    fireEvent.click(logoutButton);

    expect(localStorage.getItem('user')).toBeNull();
    expect(pushSpy).toHaveBeenCalledWith('/');
  });

  test('redirects to favorite recipes page when "Favorite Recipes" button is clicked', () => {
    const history = createMemoryHistory();
    const pushSpy = jest.spyOn(history, 'push');
    render(
      <Router history={ history }>
        <Profile />
      </Router>,
    );

    const favoriteRecipesButton = screen.getByTestId('profile-favorite-btn');
    fireEvent.click(favoriteRecipesButton);

    expect(pushSpy).toHaveBeenCalledWith('/favorite-recipes');
  });
});
