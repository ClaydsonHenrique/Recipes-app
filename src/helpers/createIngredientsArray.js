export default function createIngredientsArray(recipe) {
  const ingredientsName = [];
  const measures = [];
  const recipeEntries = Object.entries(recipe);

  recipeEntries.forEach(([key, value]) => {
    const hasValue = (value !== ' ' && value !== '' && value !== null);

    if (key.includes('strIngredient') && hasValue) {
      ingredientsName.push(value);
    }
    if (key.includes('strMeasure') && hasValue) {
      measures.push(value);
    }
  });

  const ingredientsArray = ingredientsName.map((ingredient, index) => ({
    name: ingredient,
    measure: measures[index],
    isChecked: false,
  }));

  return ingredientsArray;
}
