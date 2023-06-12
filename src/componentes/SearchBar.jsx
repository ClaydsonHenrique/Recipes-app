import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      radios: '',
      receitas: [],
    };
  }

  inputSearch = async ({ target }) => {
    const { value } = target;
    this.setState({ search: value });
  };

  handleChange = async ({ target }) => {
    const { value } = target;
    this.setState({ radios: value });
  };

  foodFilter = async () => {
    const { search, radios } = this.state;
    const obj = {
      ingredient: 'filter.php?i',
      name: 'search.php?s',
      'first-letter': 'search.php?f',
    };
    const param = `${obj[radios]}=${search}`;

    if (radios === 'first-letter' && search.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/${param}`);
      const data = await response.json();
      console.log(data);
      return data;
    }
  };

  drinksFilter = async () => {
    const { search, radios } = this.state;
    const obj = {
      ingredient: 'filter.php?i',
      name: 'search.php?s',
      'first-letter': 'search.php?f',
    };
    const param = `${obj[radios]}=${search}`;

    if (radios === 'first-letter' && search.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/${param}`);
      const data = await response.json();
      console.log(data);
      return data;
    }
  };

  handleClick = async () => {
    const { pathname } = this.props;
    console.log(pathname);
    if (pathname === '/meals') {
      const resultReceitas = await this.foodFilter();
      this.setState({ receitas: resultReceitas });
    } else if (pathname === '/drinks') {
      const resultReceitas = await this.drinksFilter();
      this.setState({ receitas: resultReceitas });
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
          onClick={ this.handleClick }
        >
          buscar

        </button>
      </div>
    );
  }
}
export default SearchBar;

SearchBar.propTypes = {
  pathname: PropTypes.string.isRequired,
};
