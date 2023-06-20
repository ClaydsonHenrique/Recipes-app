export function progessStorage(type, selectedIngredient, id) {
  const storageData = localStorage.getItem('inProgressRecipes');
  const prevStorage = (
    (storageData) ? JSON.parse(storageData) : { cocktails: {}, meals: {} }
  );

  if (!storageData) {
    const setStorage = {
      ...prevStorage,
      [type]: {
        [id]: selectedIngredient,
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(setStorage));
  } else {
    const addStorage = {
      ...prevStorage,
      [type]: {
        ...prevStorage[type],
        [id]: selectedIngredient,
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(addStorage));
  }
}

export function getProgessStorage(type, setState, id) {
  const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (storage && storage[type] && storage[type][id]) {
    return setState(storage[type][id]);
  }
  return [];
}
