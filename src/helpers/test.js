export default function test(recipe, type, id) {
  const recipeInfo = {
    id,
    type: (type === 'meals') ? 'meals' : 'drink',
    nationality: recipe.strArea || '',
    category: recipe.strCategory,
    name: '',
    image: '',
    alcoholicOrNot: '',
  };

  if (type === 'meals') {
    recipeInfo.name = recipe.strMeal;
    recipeInfo.image = recipe.strMealThumb;
  } else {
    recipeInfo.name = recipe.strDrink;
    recipeInfo.image = recipe.strDrinkThumb;
    recipeInfo.alcoholicOrNot = recipe.strAlcoholic;
  }
  return recipeInfo;
}
