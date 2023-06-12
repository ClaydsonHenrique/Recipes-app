import React from 'react';
import { fireEvent, screen, render } from '@testing-library/react';
import SearchBar from '../componentes/SearchBar';

describe('testando o componente SearchBar', () => {
  it('verificando se searshBar renderiza todos os inputs e botão', () => {
    render(<SearchBar pathname="/meals" />);
    const inputBusca = screen.getByTestId('search-input');
    expect(inputBusca).toBeInTheDocument();
    const redioIngredient = screen.getByTestId('ingredient-search-radio');
    expect(redioIngredient).toBeInTheDocument();
    const radioName = screen.getByTestId('name-search-radio');
    expect(radioName).toBeInTheDocument();
    const radioFirstLetter = screen.getByTestId('first-letter-search-radio');
    expect(radioFirstLetter).toBeInTheDocument();
    const btnSearch = screen.getByTestId('exec-search-btn');
    expect(btnSearch).toBeInTheDocument();
  });
  it('verificando se ao digitar no input o valor aparece na tela', () => {
    render(<SearchBar pathname="/meals" />);
    const inputBusca = screen.getByTestId('search-input');
    fireEvent.change(inputBusca, { target: { value: 'chicken' } });
    expect(inputBusca.value).toBe('chicken');
  });
  it('verificando se so um radio fica selecionado', () => {
    render(<SearchBar pathname="/meals" />);
    const radioIngredient = screen.getByTestId('ingredient-search-radio');
    const radioName = screen.getByTestId('name-search-radio');
    const radioFirstLetter = screen.getByTestId('first-letter-search-radio');
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

  it('verificando se ao escrever no input , selecionar um radio e clicar em buscar faz requisição a api', () => {
    const fetchSpy = jest.spyOn(window, 'fetch');
    render(<SearchBar pathname="/meals" />);
    const inputBusca = screen.getByTestId('search-input');
    fireEvent.change(inputBusca, { target: { value: 'chicken' } });
    const radioIngredient = screen.getByTestId('ingredient-search-radio');
    fireEvent.click(radioIngredient);
    const btnSearch = screen.getByTestId('exec-search-btn');
    fireEvent.click(btnSearch);
    const apiUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken';
    expect(fetchSpy).toBeCalledWith(apiUrl);
    fetchSpy.mockRestore();
  });

  it('verificando se na rota drinks ao buscar chama uma api diferente', () => {
    const fetchSpy = jest.spyOn(window, 'fetch');
    render(<SearchBar pathname="/drinks" />);
    const inputBusca = screen.getByTestId('search-input');
    fireEvent.change(inputBusca, { target: { value: 'lemon' } });
    const radioIngredient = screen.getByTestId('ingredient-search-radio');
    fireEvent.click(radioIngredient);
    const btnSearch = screen.getByTestId('exec-search-btn');
    fireEvent.click(btnSearch);
    const apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=lemon';
    expect(fetchSpy).toBeCalledWith(apiUrl);
    fetchSpy.mockRestore();
  });
});
