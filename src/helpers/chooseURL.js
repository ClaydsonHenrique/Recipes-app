export default function chooseURL(type) {
  const mealsURL = 'https://www.themealdb.com/api/json/v1/1/';
  const drinkURL = 'https://www.thecocktaildb.com/api/json/v1/1/';
  if (type === 'meals') return mealsURL;
  return drinkURL;
}
