import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import buttonicon from '../images/shareIcon.svg';
import './DoneRecipesStyle.css';
import Header from '../componentes/Header';

class DoneRecipes extends Component {
  state = {
    doneRecipes: [],
    CopiedMessage: '',
    filteredRecipes: [],
  };

  componentDidMount() {
    const teste = [
      {
        id: '52771',
        type: 'meal',
        nationality: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
        doneDate: '23/06/2020',
        tags: ['Pasta', 'Curry'],
      },
      {
        id: '178319',
        type: 'drink',
        nationality: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
        doneDate: '23/06/2020',
        tags: [],
      },
    ];
    const jsonAdd = JSON.stringify(teste);
    window.localStorage.setItem('DoneRecipes', jsonAdd);
    const jsonRecipe = window.localStorage.getItem('DoneRecipes');
    const Recipes = JSON.parse(jsonRecipe);
    this.setState({
      doneRecipes: Recipes,
      filteredRecipes: Recipes,
    });
  }

  handleFilterByMeal = () => {
    const { doneRecipes } = this.state;
    const filteredRecipes = doneRecipes.filter((recipe) => recipe.type === 'meal');
    this.setState({ filteredRecipes });
  };

  handleFilterByDrink = () => {
    const { doneRecipes } = this.state;
    const filteredRecipes = doneRecipes.filter((recipe) => recipe.type === 'drink');
    this.setState({ filteredRecipes });
  };

  handleRemoveFilter = () => {
    const { doneRecipes } = this.state;
    this.setState({ filteredRecipes: doneRecipes });
  };

  handleShareButton = async (i) => {
    const { doneRecipes } = this.state;
    const number = 3000;
    const curr = doneRecipes[i];
    const url = `http://localhost:3000/${curr.type}s/${curr.id}`;
    try {
      await navigator.clipboard.writeText(url);
      this.setState({ CopiedMessage: 'Link copied!' });
      setTimeout(() => {
        this.setState({ CopiedMessage: '' });
      }, number);
    } catch (error) {
      console.log('Erro ao copiar o URL para o clipboard:', error);
    }
  };

  render() {
    const { filteredRecipes, CopiedMessage } = this.state;
    return (
      <div>
        <Header />
        <button
          data-testid="filter-by-all-btn"
          onClick={ this.handleRemoveFilter }
        >
          Todas
        </button>
        <button
          data-testid="filter-by-meal-btn"
          onClick={ this.handleFilterByMeal }
        >
          Comidas
        </button>
        <button
          data-testid="filter-by-drink-btn"
          onClick={ this.handleFilterByDrink }
        >
          Bebidas
        </button>
        <div>
          {filteredRecipes.map((curr, i) => (
            <React.Fragment key={ i }>
              <Link to={ `/${curr.type}s/${curr.id}` }>
                <img
                  src={ curr.image }
                  data-testid={ `${i}-horizontal-image` }
                  alt="imagem da receita"
                  className="small-image"
                />
              </Link>
              <Link to={ `/${curr.type}s/${curr.id}` }>
                <p data-testid={ `${i}-horizontal-name` }>{ curr.name }</p>
              </Link>
              {curr.type === 'drink' ? (
                <p data-testid={ `${i}-horizontal-top-text` }>
                  {curr.alcoholicOrNot}
                </p>
              ) : (
                <p data-testid={ `${i}-horizontal-top-text` }>
                  {`${curr.nationality} - ${curr.category}`}
                </p>
              )}
              <p data-testid={ `${i}-horizontal-done-date` }>{ curr.doneDate }</p>
              {
                curr.tags.map((tag, index) => (
                  <p
                    key={ `${i}-tag-${index}` }
                    data-testid={ `${i}-${tag}-horizontal-tag` }
                  >
                    {tag}
                  </p>
                ))
              }
              <button
                data-testid={ `${i}-horizontal-share-btn` }
                src={ buttonicon }
                onClick={ () => this.handleShareButton(i) }
              >
                <img src={ buttonicon } alt="icone de compartilhamento" />
              </button>
              <p>{ CopiedMessage }</p>
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }
}

export default DoneRecipes;
