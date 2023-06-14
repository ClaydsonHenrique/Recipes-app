import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './renderWithRouter';
import Header from '../componentes/Header';

const titulo = 'page-title';
const btnProfile = 'profile-top-btn';
const btnSearch = 'search-top-btn';

const busca = 'search-input';

describe('verificando Header', () => {
  it('Verificando se contem botoes na pagina e se ao clicar no icone profile vai para a pagina Profile', async () => {
    const { history } = renderWithRouterAndRedux(<Header history={ { location: { pathname: '/meals' } } } />);
    const title = screen.getByTestId(titulo);
    expect(title).toHaveTextContent('Meals');

    const buttonProfile = screen.getByTestId(btnProfile);
    expect(buttonProfile).toBeInTheDocument();
    const buttonSearch = screen.getByTestId(btnSearch);
    expect(buttonSearch).toBeInTheDocument();

    fireEvent.click(buttonProfile);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/profile');
    });
  });

  it('verificando se ao clicar no botao de pesquisar renderiza os inputs', () => {
    renderWithRouterAndRedux(<Header history={ { location: { pathname: '/meals' } } } />);
    const buttonSearch = screen.getByTestId(btnSearch);
    fireEvent.click(buttonSearch);

    const inputBusca = screen.getByTestId(busca);
    expect(inputBusca).toBeInTheDocument();

    fireEvent.click(buttonSearch);
    expect(inputBusca).not.toBeInTheDocument();
  });

  it('verificando se na pagina profile  aparece apenas o titulo e a o button profile ', () => {
    renderWithRouterAndRedux(<Header history={ { location: { pathname: '/profile' } } } />);
    const title = screen.getByTestId(titulo);
    expect(title).toHaveTextContent('Profile');

    const buttonProfile = screen.getByTestId(btnProfile);
    expect(buttonProfile).toBeInTheDocument();
    const buttonSearch = screen.queryByTestId(btnSearch);
    expect(buttonSearch).not.toBeInTheDocument();
  });
  it('verificando se nas paginas done-recipes  aparece apenas o titulo e a o button profile ', () => {
    renderWithRouterAndRedux(<Header history={ { location: { pathname: '/done-recipes' } } } />);
    const title = screen.getByTestId(titulo);
    expect(title).toHaveTextContent('Done Recipes');

    const buttonProfile = screen.getByTestId(btnProfile);
    expect(buttonProfile).toBeInTheDocument();

    const buttonSearch = screen.queryByTestId(btnSearch);
    expect(buttonSearch).not.toBeInTheDocument();
  });
  it('verificando se nas paginas favorite-recipes  aparece apenas o titulo e a o button profile ', () => {
    renderWithRouterAndRedux(<Header history={ { location: { pathname: '/favorite-recipes' } } } />);
    const title = screen.getByTestId(titulo);
    expect(title).toHaveTextContent('Favorite Recipes');

    const buttonProfile = screen.getByTestId(btnProfile);
    expect(buttonProfile).toBeInTheDocument();
    const buttonSearch = screen.queryByTestId(btnSearch);
    expect(buttonSearch).not.toBeInTheDocument();
  });
  it('verificando se na rota / nao renderiza o nada', () => {
    const title = screen.queryByTestId(titulo);
    expect(title).not.toBeInTheDocument();
    const buttonSearch = screen.queryByTestId(btnSearch);
    expect(buttonSearch).not.toBeInTheDocument();
    const buttonProfile = screen.queryByTestId(btnProfile);
    expect(buttonProfile).not.toBeInTheDocument();
  });
  it('Verificando se na rota drinks muda o titulo e aparecem todos os botoes', async () => {
    const { history } = renderWithRouterAndRedux(<Header history={ { location: { pathname: '/drinks' } } } />);
    const title = screen.getByTestId(titulo);
    expect(title).toHaveTextContent('Drinks');

    const buttonProfile = screen.getByTestId(btnProfile);
    expect(buttonProfile).toBeInTheDocument();
    const buttonSearch = screen.getByTestId(btnSearch);
    expect(buttonSearch).toBeInTheDocument();

    fireEvent.click(buttonProfile);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/profile');
    });
  });
  it('verificando se ao pesquisar retornar mais de uma receita renderiza na tela', async () => {
    renderWithRouterAndRedux(<Header
      history={ { location: { pathname: '/meals' },

      } }
    />);
    const title = screen.getByTestId(titulo);
    expect(title).toHaveTextContent('Meals');

    const buttonSearch = screen.getByTestId(btnSearch);
    fireEvent.click(buttonSearch);
  });
  it('verificando se ao filtar meals encontra mais de  uma receita , renderiza as os titulos e as imagens das receitas', async () => {
    const search = busca;
    const searchName = 'name-search-radio';
    const btn = 'exec-search-btn';
    renderWithRouterAndRedux(<Header history={ { location: { pathname: '/meals' } } } />);
    const buttonSearch = screen.getByTestId(btnSearch);
    fireEvent.click(buttonSearch);

    const inputBusca = screen.getByTestId(search);
    const radioName = screen.getByTestId(searchName);
    const btnSearchs = screen.getByTestId(btn);

    fireEvent.change(inputBusca, { target: { value: 'chicken' } });
    fireEvent.click(radioName);
    fireEvent.click(btnSearchs);

    await waitFor(() => {
      const title1 = screen.getByTestId('0-card-name');
      const title2 = screen.getByTestId('1-card-name');
      const title3 = screen.getByTestId('2-card-name');
      expect(title1).toHaveTextContent('Chicken Handi');
      expect(title2).toHaveTextContent('Chicken Congee');
      expect(title3).toHaveTextContent('Chicken Karaage');

      const image1 = screen.getByTestId('0-card-img');
      const image2 = screen.getByTestId('1-card-img');
      const image3 = screen.getByTestId('2-card-img');
      expect(image1).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg');
      expect(image2).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/1529446352.jpg');
      expect(image3).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/tyywsw1505930373.jpg');
    });
  });
  it('verificando se ao filtar drinks encontra mais de  uma receita , renderiza as os titulos e as imagens das receitas', async () => {
    const searchName = 'name-search-radio';
    const btn = 'exec-search-btn';
    renderWithRouterAndRedux(<Header history={ { location: { pathname: '/drinks' } } } />);
    const buttonSearch = screen.getByTestId(btnSearch);
    fireEvent.click(buttonSearch);

    const inputBusca = screen.getByTestId(busca);
    const radioName = screen.getByTestId(searchName);
    const btnSearchs = screen.getByTestId(btn);

    fireEvent.change(inputBusca, { target: { value: 'gin' } });
    fireEvent.click(radioName);
    fireEvent.click(btnSearchs);

    await waitFor(() => {
      const title1 = screen.getByTestId('0-card-name');
      const title2 = screen.getByTestId('1-card-name');
      const title3 = screen.getByTestId('2-card-name');
      expect(title1).toHaveTextContent('Gin Fizz');
      expect(title2).toHaveTextContent('Gin Sour');
      expect(title3).toHaveTextContent('Pink Gin');

      const image1 = screen.getByTestId('0-card-img');
      const image2 = screen.getByTestId('1-card-img');
      const image3 = screen.getByTestId('2-card-img');
      expect(image1).toHaveAttribute('src', 'https://www.thecocktaildb.com/images/media/drink/drtihp1606768397.jpg');
      expect(image2).toHaveAttribute('src', 'https://www.thecocktaildb.com/images/media/drink/noxp7e1606769224.jpg');
      expect(image3).toHaveAttribute('src', 'https://www.thecocktaildb.com/images/media/drink/qyr51e1504888618.jpg');
    });
  });
});
