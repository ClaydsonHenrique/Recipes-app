import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import meal from '../images/mealIcon.svg';
import drink from '../images/drinkIcon.svg';
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
          <span className="footer__drink-img">
            <a
              href="/drinks"
              onClick={ this.handleClickDrinks }
            >
              <img
                data-testid="drinks-bottom-btn"
                src={ drink }
                alt="drink"
              />
            </a>
          </span>
          <span className="footer__meal-img">
            <a
              href="/meals"
              onClick={ this.handleClickMeals }
            >
              <img
                src={ meal }
                alt="meal"
                data-testid="meals-bottom-btn"
              />
            </a>
          </span>
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

export default withRouter(connect()(Footer));
