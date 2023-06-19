export default function chooseURL(type) {
  const foodURL = 'https://www.themealdb.com/api/json/v1/1/';
  const drinkURL = 'https://www.thecocktaildb.com/api/json/v1/1/';
  if (type === 'meals') return foodURL;
  return drinkURL;
}
