import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import imagem from '../images/profileIcon.svg';
import imagem2 from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      inputs: false,
    };
  }

  campoBusca = () => {
    const { count } = this.state;
    if (count === 0) {
      this.setState({ inputs: true, count: 1 });
    } else if (count === 1) {
      this.setState({ inputs: false, count: 0 });
    }
  };

  rendeObjst = () => {
    const { inputs } = this.state;
    const { history } = this.props;
    const { location } = history;
    const { pathname } = location;

    if (pathname === '/meals' || pathname === '/drinks') {
      return (
        <div>

          <Link to="/profile">
            <button>
              <img src={ imagem } alt="" data-testid="profile-top-btn" />
            </button>
          </Link>
          <button
            onClick={ this.campoBusca }

          >
            <img src={ imagem2 } alt="" data-testid="search-top-btn" />
          </button>
          {inputs ? <SearchBar pathname={ pathname } /> : ''}
          <h1 data-testid="page-title">
            {pathname === '/meals' ? 'Meals' : 'Drinks'}
          </h1>
        </div>
      );
    } if (
      pathname === '/profile'
      || pathname === '/done-recipes'
      || pathname === '/favorite-recipes'
    ) {
      return (
        <div>
          <button>
            <img src={ imagem } alt="" data-testid="profile-top-btn" />
          </button>
          <h1 data-testid="page-title">
            {pathname === '/profile' ? 'Profile' : ''}
            {pathname === '/done-recipes' ? 'Done Recipes' : ''}
            {pathname === '/favorite-recipes' ? 'Favorite Recipes' : ''}
          </h1>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        {this.rendeObjst()}

      </div>
    );
  }
}

export default Header;

Header.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};
