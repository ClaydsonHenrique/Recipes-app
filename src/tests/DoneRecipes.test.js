import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { localStorage } from './helpers/localStorageMock';
import { renderWithRouterAndRedux } from '../helpers/renderwith';
import DoneRecipes from '../pages/DoneRecipes';

const doneRecipes = [
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
const router = '/done-recipes';
const dataMealButton = 'filter-by-meal-btn';
const dataButton = '0-horizontal-share-btn';

describe('teste da tela DoneRecipes', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('testando se os botões e a imagem estão na tela', () => {
    localStorage.setItem('DoneRecipes', JSON.stringify(doneRecipes));
    renderWithRouterAndRedux(<DoneRecipes />, { initialEntries: [router] });
    const button1 = screen.getByTestId('filter-by-all-btn');
    const button2 = screen.getByTestId(dataMealButton);
    const button3 = screen.getByTestId('filter-by-drink-btn');
    const button4 = screen.getByTestId(dataButton);
    const button5 = screen.getByTestId('1-horizontal-share-btn');
    const image1 = screen.getByTestId('0-horizontal-image');
    const image2 = screen.getByTestId('1-horizontal-image');

    expect(button1).toBeInTheDocument();
    expect(button2).toBeInTheDocument();
    expect(button3).toBeInTheDocument();
    expect(button4).toBeInTheDocument();
    expect(button5).toBeInTheDocument();
    expect(image1).toBeInTheDocument();
    expect(image2).toBeInTheDocument();
  });

  it('testando se o botão de compartilhamento copia o link', () => {
    localStorage.setItem('DoneRecipes', JSON.stringify(doneRecipes));
    renderWithRouterAndRedux(<DoneRecipes />, { initialEntries: [router] });
    const button4 = screen.getByTestId(dataButton);
    const mockClipboardWriteText = jest.fn();
    Object.assign(navigator, {
      clipboard: {
        writeText: mockClipboardWriteText,
      },
    });

    fireEvent.click(button4);
    expect(mockClipboardWriteText).toHaveBeenCalledTimes(1);
    expect(mockClipboardWriteText).toHaveBeenCalledWith(
      'http://localhost:3000/meals/52771',
    );
  });
  it('testando se o filtro de "Comidas" funciona corretamente', () => {
    localStorage.setItem('DoneRecipes', JSON.stringify(doneRecipes));
    renderWithRouterAndRedux(<DoneRecipes />, { initialEntries: [router] });
    const button2 = screen.getByTestId(dataMealButton);
    fireEvent.click(button2);
    const filteredRecipes = screen.getAllByTestId(/-horizontal-name$/);
    expect(filteredRecipes.length).toBe(1);
    expect(filteredRecipes[0]).toHaveTextContent('Spicy Arrabiata Penne');
  });

  it('testando se o filtro de "Bebidas" funciona corretamente', () => {
    localStorage.setItem('DoneRecipes', JSON.stringify(doneRecipes));
    renderWithRouterAndRedux(<DoneRecipes />, { initialEntries: [router] });
    const button3 = screen.getByTestId('filter-by-drink-btn');
    fireEvent.click(button3);
    const filteredRecipes = screen.getAllByTestId(/-horizontal-name$/);
    expect(filteredRecipes.length).toBe(1);
    expect(filteredRecipes[0]).toHaveTextContent('Aquamarine');
  });

  it('testando se o botão "Todas" remove o filtro', () => {
    localStorage.setItem('DoneRecipes', JSON.stringify(doneRecipes));
    renderWithRouterAndRedux(<DoneRecipes />, { initialEntries: [router] });
    const button2 = screen.getByTestId(dataMealButton);
    const button1 = screen.getByTestId('filter-by-all-btn');

    fireEvent.click(button2);
    expect(screen.getAllByTestId(/-horizontal-name$/).length).toBe(1);

    fireEvent.click(button1);
    expect(screen.getAllByTestId(/-horizontal-name$/).length).toBe(2);
  });
});
