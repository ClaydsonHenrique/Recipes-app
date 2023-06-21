const MAX_CATEGORIES = 12;

async function fetchMeals() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  return data.meals || [];
}

async function fetchDrinks() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  return data.drinks || [];
}

async function fetchMealCategories() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();
  return data.meals.map((category) => category.strCategory).slice(0, MAX_CATEGORIES);
}

async function fetchDrinkCategories() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();
  return data.drinks.map((category) => category.strCategory).slice(0, MAX_CATEGORIES);
}

async function fetchDrinksByCategory(category) {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`,
  );
  const data = await response.json();
  return data.drinks || [];
}

async function fetchMealsByCategory(category) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
  );
  const data = await response.json();
  return data.meals || [];
}

export {
  fetchDrinks,
  fetchMeals,
  fetchMealCategories,
  fetchDrinkCategories,
  fetchDrinksByCategory,
  fetchMealsByCategory };
