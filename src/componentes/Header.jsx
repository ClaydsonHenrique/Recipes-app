import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import imagem from '../images/profileIcon.svg';
import imagem2 from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../css/Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: false,
      receitasfilter: [],
    };
  }

  campoBusca = () => {
    const { inputs } = this.state;
    this.setState({ inputs: !inputs });
  };

  rendeObjst = () => {
    const { inputs, receitasfilter } = this.state;
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
          {inputs ? <SearchBar
            pathname={ pathname }
            history={ history }
            receitasfilter={ receitasfilter }
          /> : ''}
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
          <Link to="/profile">
            <button>
              <img src={ imagem } alt="" data-testid="profile-top-btn" />
            </button>
          </Link>
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

export default withRouter(connect()(Header));
Header.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};
