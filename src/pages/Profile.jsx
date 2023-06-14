import React from 'react';

function Profile() {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userEmail = storedUser ? storedUser.email : '';

  return (
    <div>
      <h2>Profile Page</h2>
      <p data-testid="profile-email">
        Email:
        {' '}
        {userEmail}
      </p>
      <button data-testid="profile-done-btn">Done Recipes</button>
      <button data-testid="profile-favorite-btn">Favorite Recipes</button>
      <button data-testid="profile-logout-btn">Logout</button>
    </div>
  );
}

export default Profile;
