import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
      receitasfilter: [],
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

  renderReceitesas = () => {
    const { receitas } = this.props;
    if (receitas) {
      console.log(receitas);
      return receitas.map((receita, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
          <h3
            className="titulo-receitas"
            data-testid={ `${index}-card-name` }
          >
            {receita.strMeal ? receita.strMeal : receita.strDrink}

          </h3>
          <img
            className="imagens-receitas"
            data-testid={ `${index}-card-img` }
            src={ receita.strMealThumb ? receita.strMealThumb : receita.strDrinkThumb }
            alt=""
          />
        </div>
      ));
    }
  };

  render() {
    return (
      <div>
        {this.rendeObjst()}
        {this.renderReceitesas()}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  receitas: state.receitas,
});

export default connect(mapStateToProps)(Header);
Header.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
  receitas: PropTypes.arrayOf(PropTypes.arrayOf).isRequired,
};
