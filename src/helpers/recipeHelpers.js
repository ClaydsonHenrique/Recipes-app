export function verifyDoneRecipes(id) {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const searchID = doneRecipes.findIndex((el) => el.id === id);
  return searchID >= 0;
}

export function verifyInProgressRecipes(id, type) {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const keysProgressRecipes = type === 'meals'
    ? Object.keys(inProgressRecipes.meals)
    : Object.keys(inProgressRecipes.drinks);
  const searchProgressRecipes = keysProgressRecipes.findIndex((el) => el === id);
  return searchProgressRecipes >= 0;
}

export function getValidIngredients(recipeData) {
  const ingredientData = Object.entries(recipeData).filter((item) => {
    const isIngredient = item[0].includes('strIngredient')
        || item[0].includes('strMeasure');
    const isNotNull = item[1];
    const isNotEmpty = isNotNull
      ? item[1] !== '' && item[1] !== ' '
      : isNotNull;

    if (isIngredient && isNotEmpty) {
      return item;
    }
    return false;
  });

  const max = ingredientData.length / 2;
  const ingredientPart = ingredientData
    .slice(0, max)
    .map((ingredient) => ingredient[1]);
  const measurePart = ingredientData
    .slice(max)
    .map((measure) => measure[1]);

  return ingredientPart.map((ingredient, index) => ({
    ingredient,
    measure: measurePart[index],
  }));
}
