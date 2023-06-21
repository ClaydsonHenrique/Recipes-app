import React from 'react';
import './Button.css';

function Button() {
  return (
    <div>
      <button
        className="Fixed"
        data-testid="start-recipe-btn"
        type="button"
      >
        Start Recipe
      </button>
    </div>
  );
}

export default Button;
