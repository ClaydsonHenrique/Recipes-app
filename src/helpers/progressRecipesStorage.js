export function progessStorage(type, selectedIngredient, id) {
  const storageData = localStorage.getItem('inProgressRecipes');
  const prevStorage = storageData
    ? JSON.parse(storageData) : { cocktails: {}, meals: {} };

  const updatedStorage = {
    ...prevStorage,
    [type]: {
      ...prevStorage[type],
      [id]: selectedIngredient,
    },
  };

  localStorage.setItem('inProgressRecipes', JSON.stringify(updatedStorage));
}

export function getProgessStorage(type, setState, id) {
  const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));

  if (storage && storage[type] && storage[type][id]) {
    setState(storage[type][id]);
    return storage[type][id];
  }

  return [];
}
