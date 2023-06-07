import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import drink from '../images/drinkIcon.svg';
import meal from '../images/mealIcon.svg';
import './footer.css';

class Footer extends Component {
  handleClickDrinks = () => {
    const { history } = this.props;
    history.push('/drinks');
  };

  handleClickMeals = () => {
    const { history } = this.props;
    history.push('/meals');
  };

  render() {
    return (
      <div
        className="footer__page"
        data-testid="footer"
      >
        <div className="footer_images-container">
          <a
            className="footer__drink-img"
            href="/drinks"
            onClick={ this.handleClickDrinks }
          >
            <img
              src={ drink }
              alt="drink"
              data-testid="drinks-bottom-btn"
            />
          </a>
          <a
            className="footer__meal-img"
            href="/meals"
            onClick={ this.handleClickMeals }
          >
            <img
              src={ meal }
              alt="meal"
              data-testid="meals-bottom-btn"
            />
          </a>
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Footer);
