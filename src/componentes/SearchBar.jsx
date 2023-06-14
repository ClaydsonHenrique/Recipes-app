import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addreceitas } from '../redux/actions';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      radios: '',
      receitas: [],
    };
  }

  inputSearch = ({ target }) => {
    const { value } = target;
    this.setState({ search: value });
  };

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({ radios: value });
  };

  filterAllIngredients = async () => {
    const obj = {
      ingredient: 'filter.php?i',
      name: 'search.php?s',
      'first-letter': 'search.php?f',
    };
    const { pathname } = this.props;
    const { search, radios } = this.state;
    const param = `${obj[radios]}=${search}`;
    let urlApi = '';
    if (pathname === '/meals') {
      urlApi = `https://www.themealdb.com/api/json/v1/1/${param}`;
    } else if (pathname === '/drinks') {
      urlApi = `https://www.thecocktaildb.com/api/json/v1/1/${param}`;
    }
    if (radios === 'first-letter' && search.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const response = await fetch(urlApi);
      const data = await response.json();
      this.setState({ receitas: data }, this.redirectReceitas);
      return data;
    }
  };

  redirectReceitas = () => {
    const { receitas } = this.state;
    const { pathname, history, dispatch } = this.props;
    const local = {
      '/drinks': 'drinks',
      '/meals': 'meals',
    };
    const getIds = {
      '/drinks': 'idDrink',
      '/meals': 'idMeal',
    };

    const localKey = local[pathname];
    const getIdKey = getIds[pathname];
    const validateUrl = localKey !== undefined;
    const saveReceita = receitas && receitas[localKey];

    if (!saveReceita) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (validateUrl && saveReceita.length === 1) {
      const getId = saveReceita[0][getIdKey];
      history.push(`${pathname}/${getId}`);
    } else if (validateUrl && saveReceita.length > 1) {
      const number = 12;
      const filterReceitas = saveReceita.slice(0, number);
      dispatch(addreceitas(filterReceitas));
    }
  };

  render() {
    return (
      <div>
        <input
          type="text"
          data-testid="search-input"
          onChange={ this.inputSearch }
        />
        <label htmlFor="radio-ingredient">
          <input
            id="radio-ingredient"
            onChange={ this.handleChange }
            type="radio"
            value="ingredient"
            name="radio"
            data-testid="ingredient-search-radio"
          />
          Ingredient
        </label>
        <label htmlFor="radio-name">
          <input
            id="radio-name"
            onChange={ this.handleChange }
            type="radio"
            value="name"
            data-testid="name-search-radio"
            name="radio"
          />
          Name
        </label>
        <label htmlFor="radio-first-letter">

          <input
            id="radio-first-letter"
            onChange={ this.handleChange }
            type="radio"
            value="first-letter"
            data-testid="first-letter-search-radio"
            name="radio"
          />
          First letter
        </label>
        <button
          data-testid="exec-search-btn"
          onClick={ this.filterAllIngredients }
        >
          buscar

        </button>
      </div>
    );
  }
}
export default connect()(SearchBar);
SearchBar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
  pathname: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};
