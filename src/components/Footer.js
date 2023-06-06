import React, { Component } from 'react';
import drink from '../images/drinkIcon.svg';
import meal from '../images/mealIcon.svg';
import '../components/footer.css';

class Footer extends Component {
  render() {
    return (
      <div
        className="footer__page"
        data-testid="footer"
      >
        <div className="footer_images-container">
          <img
            className="footer__drink-img"
            src={ drink }
            alt="drink"
            data-testid="drinks-bottom-btn"
          />
          <img
            className="footer__meal-img"
            src={ meal }
            alt="meal"
            data-testid="meals-bottom-btn"
          />
        </div>
      </div>
    );
  }
}

export default Footer;
