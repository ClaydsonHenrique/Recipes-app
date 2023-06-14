import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { renderWithRouterAndRedux } from '../helpers/renderwith';
import SearchBar from '../componentes/SearchBar';

const search = 'search-input';
const searchIngredient = 'ingredient-search-radio';
const firstLetter = 'first-letter-search-radio';
const searchName = 'name-search-radio';
const btn = 'exec-search-btn';
describe('testando o componente SearchBar', () => {
  it('verificando se searshBar renderiza todos os inputs e botão', () => {
    const initialEntries = ['/meals'];
    const initialState = { email: '', receitas: [] };
    renderWithRouterAndRedux(<SearchBar pathname="/meals" />, { initialEntries, initialState });

    const inputBusca = screen.getByTestId(search);
    expect(inputBusca).toBeInTheDocument();
    const redioIngredient = screen.getByTestId(searchIngredient);
    expect(redioIngredient).toBeInTheDocument();
    const radioName = screen.getByTestId(searchName);
    expect(radioName).toBeInTheDocument();
    const radioFirstLetter = screen.getByTestId(firstLetter);
    expect(radioFirstLetter).toBeInTheDocument();
    const btnSearch = screen.getByTestId(btn);
    expect(btnSearch).toBeInTheDocument();
  });
  it('verificando se ao digitar no input o valor aparece na tela', () => {
    renderWithRouterAndRedux(<SearchBar pathname="/meals" />);
    const inputBusca = screen.getByTestId(search);
    fireEvent.change(inputBusca, { target: { value: 'chicken' } });
    expect(inputBusca.value).toBe('chicken');
  });
  it('verificando se so um radio fica selecionado', () => {
    renderWithRouterAndRedux(<SearchBar pathname="/meals" />);
    const radioIngredient = screen.getByTestId(searchIngredient);
    const radioName = screen.getByTestId(searchName);
    const radioFirstLetter = screen.getByTestId(firstLetter);
    expect(radioIngredient).not.toBeChecked();
    expect(radioName).not.toBeChecked();
    expect(radioFirstLetter).not.toBeChecked();

    fireEvent.click(radioName);
    expect(radioIngredient).not.toBeChecked();
    expect(radioName).toBeChecked();
    expect(radioFirstLetter).not.toBeChecked();

    fireEvent.click(radioIngredient);
    expect(radioIngredient).toBeChecked();
    expect(radioName).not.toBeChecked();
    expect(radioFirstLetter).not.toBeChecked();
  });

  it('verificando se ao escrever no input , selecionar o radio e clicar em buscar faz requisição a api', () => {
    const fetchSpy = jest.spyOn(window, 'fetch');
    renderWithRouterAndRedux(<SearchBar pathname="/meals" />);
    const inputBusca = screen.getByTestId(search);
    fireEvent.change(inputBusca, { target: { value: 'chicken' } });
    const radioIngredient = screen.getByTestId(searchIngredient);
    fireEvent.click(radioIngredient);
    const btnSearch = screen.getByTestId(btn);
    fireEvent.click(btnSearch);
    const apiUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken';
    expect(fetchSpy).toBeCalledWith(apiUrl);
    fetchSpy.mockRestore();
  });

  it('verificando se pesquisar mais de uma letra e selecinar o radio first letter, aparece um alert na tela ', () => {
    const alertMock = jest.fn();
    global.alert = alertMock;
    const fetchSpy = jest.spyOn(window, 'fetch');
    renderWithRouterAndRedux(<SearchBar pathname="/meals" />);
    const inputBusca = screen.getByTestId(search);
    fireEvent.change(inputBusca, { target: { value: 'lemon' } });
    const radioFirstLetter = screen.getByTestId(firstLetter);
    fireEvent.click(radioFirstLetter);
    const btnSearch = screen.getByTestId(btn);
    fireEvent.click(btnSearch);
    expect(alertMock).toHaveBeenCalledTimes(1);
    expect(alertMock).toHaveBeenCalledWith('Your search must have only 1 (one) character');
    fetchSpy.mockRestore();
  });

  it('verificando se pesquisar e não retorna nada, aparece um alert na tela', async () => {
    const alertMock = jest.fn();
    global.alert = alertMock;
    const fetchSpy = jest.spyOn(window, 'fetch');
    renderWithRouterAndRedux(<SearchBar pathname="/drinks" />);
    const inputBusca = screen.getByTestId(search);
    fireEvent.change(inputBusca, { target: { value: 'xablau' } });
    const radioFirstLetter = screen.getByTestId(searchName);
    fireEvent.click(radioFirstLetter);
    const btnSearch = screen.getByTestId(btn);
    fireEvent.click(btnSearch);
    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledTimes(1);
      expect(alertMock).toHaveBeenCalledWith(
        'Sorry, we haven\'t found any recipes for these filters.',
      );
      fetchSpy.mockRestore();
    });
  });

  it('verifica se é redirecionado para a pagina correta se for filtrado apenas uma receita', async () => {
    const history = createMemoryHistory({ initialEntries: ['/drinks'] });
    renderWithRouterAndRedux(<SearchBar pathname="/drinks" history={ history } />);
    const inputBusca = screen.getByTestId(search);
    const radioName = screen.getByTestId(searchName);
    const btnSearch = screen.getByTestId(btn);

    fireEvent.change(inputBusca, { target: { value: 'Aquamarine' } });
    fireEvent.click(radioName);
    fireEvent.click(btnSearch);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/178319');
    });
  });
  it('', async () => {
    const initialState = { email: '', receitas: [] };
    const { store } = renderWithRouterAndRedux(<SearchBar pathname="/drinks" />, { initialState });
    const inputBusca = screen.getByTestId(search);
    const radioName = screen.getByTestId(searchName);
    const btnSearch = screen.getByTestId(btn);

    fireEvent.change(inputBusca, { target: { value: 'gin' } });
    fireEvent.click(radioName);
    fireEvent.click(btnSearch);

    await waitFor(() => {
      expect(store.getState().receitas.receitas.length).toBe(12);
    });
  });
});
