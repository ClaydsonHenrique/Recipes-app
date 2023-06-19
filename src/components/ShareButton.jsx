import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

export default function ShareButton(prop) {
  const [linkCopied, setLinkCopied] = useState(false);
  const { type, id, index } = prop;
  const foodsOurDrinks = type === 'meals' ? 'foods' : 'drinks';

  function share() {
    clipboardCopy(`http://localhost:3000/${foodsOurDrinks}/${id}`);
    setLinkCopied(true);
  }

  return (
    <>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ share }
      >
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt="share Icon"
        />
      </button>
      {linkCopied && (
        <div>
          <span>Link copied!</span>
          <button type="button" onClick={ () => setLinkCopied(false) }>OK</button>
        </div>
      )}
    </>
  );
}
