import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Header from '../componentes/Header';

const titulo = 'page-title';
const btnProfile = 'profile-top-btn';
const btnSearch = 'search-top-btn';

describe('verificando Header', () => {
  it('Verificando se contem botoes na pagina e se ao clicar no icone profile vai para a pagina Profile', async () => {
    const { history } = renderWithRouter(<Header history={ { location: { pathname: '/meals' } } } />);
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
    renderWithRouter(<Header history={ { location: { pathname: '/meals' } } } />);
    const buttonSearch = screen.getByTestId(btnSearch);
    fireEvent.click(buttonSearch);

    const inputBusca = screen.getByTestId('search-input');
    expect(inputBusca).toBeInTheDocument();

    fireEvent.click(buttonSearch);
    expect(inputBusca).not.toBeInTheDocument();
  });

  it('verificando se na pagina profile  aparece apenas o titulo e a o button profile ', () => {
    renderWithRouter(<Header history={ { location: { pathname: '/profile' } } } />);
    const title = screen.getByTestId(titulo);
    expect(title).toHaveTextContent('Profile');

    const buttonProfile = screen.getByTestId(btnProfile);
    expect(buttonProfile).toBeInTheDocument();
    const buttonSearch = screen.queryByTestId(btnSearch);
    expect(buttonSearch).not.toBeInTheDocument();
  });
  it('verificando se nas paginas done-recipes  aparece apenas o titulo e a o button profile ', () => {
    renderWithRouter(<Header history={ { location: { pathname: '/done-recipes' } } } />);
    const title = screen.getByTestId(titulo);
    expect(title).toHaveTextContent('Done Recipes');

    const buttonProfile = screen.getByTestId(btnProfile);
    expect(buttonProfile).toBeInTheDocument();

    const buttonSearch = screen.queryByTestId(btnSearch);
    expect(buttonSearch).not.toBeInTheDocument();
  });
  it('verificando se nas paginas favorite-recipes  aparece apenas o titulo e a o button profile ', () => {
    renderWithRouter(<Header history={ { location: { pathname: '/favorite-recipes' } } } />);
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
    const { history } = renderWithRouter(<Header history={ { location: { pathname: '/drinks' } } } />);
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
});
