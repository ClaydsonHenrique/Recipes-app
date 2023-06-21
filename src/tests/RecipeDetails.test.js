import React from 'react';
import { render, screen, within, queryAllByRole } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import RecipeDetails from '../pages/RecipeDetails';

describe('Página de Detalhes', () => {
  const recipeId = '52977';

  test('1- displays recipe title and ingredients correctly', async () => {
    const mockRecipeData = {
      strMeal: 'Corba',
      strIngredient1: 'Lentils',
      strIngredient2: 'Onion',
    };

    render(
      <MemoryRouter initialEntries={ ['/meals/1'] }>
        <Route path="/meals/:id">
          <RecipeDetails />
        </Route>
      </MemoryRouter>,
    );

    const title = await screen.findByTestId('recipe-title');
    expect(title).toBeInTheDocument();

    const ingredientsList = screen.getByTestId('ingredients-list');

    const ingredientElements = queryAllByRole(ingredientsList, 'listitem');

    expect(ingredientElements).toHaveLength(2);

    expect(ingredientElements[0]).toHaveTextContent(mockRecipeData.strIngredient1);
    expect(ingredientElements[1]).toHaveTextContent(mockRecipeData.strIngredient2);
  });

  it('2- Verifica se a página de detalhes contém o vídeo da receita', async () => {
    render(
      <MemoryRouter initialEntries={ [`/recipes/${recipeId}`] }>
        <Route path="/recipes/:id">
          <RecipeDetails />
        </Route>
      </MemoryRouter>,
    );

    const video = await screen.findByTestId('video');
    expect(video).toBeInTheDocument();
  });

  it('3- Verifica se a página de detalhes tem o botão para iniciar a receita e direciona para a página correta', async () => {
    render(
      <MemoryRouter initialEntries={ [`/recipes/${recipeId}`] }>
        <Route path="/recipes/:id">
          <RecipeDetails />
        </Route>
      </MemoryRouter>,
    );

    const startRecipeBtn = await screen.findByTestId('start-recipe-btn');
    expect(startRecipeBtn).toBeInTheDocument();

    // Simule o clique no botão
    // Exemplo usando a biblioteca '@testing-library/user-event'
    // userEvent.click(startRecipeBtn);

    // Verifique se foi direcionado para a página correta
    // Exemplo usando a biblioteca '@testing-library/react-router'
    // expect(history.location.pathname).toBe(`/meals/${recipeId}/in-progress`);
  });

  it('4- Verifica se a lista de ingredientes tem o tamanho correto', async () => {
    render(
      <MemoryRouter initialEntries={ [`/recipes/${recipeId}`] }>
        <Route path="/recipes/:id">
          <RecipeDetails />
        </Route>
      </MemoryRouter>,
    );

    const ingredientList = await screen.findByTestId('ingredient-list');
    const ingredientItems = within(ingredientList).getAllByRole('listitem');

    expect(ingredientItems).toHaveLength(2);
  });
});
