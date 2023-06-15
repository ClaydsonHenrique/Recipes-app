import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Profile() {
  const history = useHistory();
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userEmail = storedUser ? storedUser.email : '';

  const handleDoneRecipes = () => {
    history.push('/done-recipes');
  };

  const handleFavoriteRecipes = () => {
    history.push('/favorite-recipes');
  };

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <h2>Profile Page</h2>
      <p data-testid="profile-email">
        Email:
        {' '}
        {userEmail}
      </p>
      <button data-testid="profile-done-btn" onClick={ handleDoneRecipes }>
        Done Recipes
      </button>
      <button data-testid="profile-favorite-btn" onClick={ handleFavoriteRecipes }>
        Favorite Recipes
      </button>
      <button data-testid="profile-logout-btn" onClick={ handleLogout }>
        Logout
      </button>
    </div>
  );
}

export default Profile;
