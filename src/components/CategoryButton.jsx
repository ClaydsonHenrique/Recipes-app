import React, { useContext, useState } from 'react';
import Context from '../context/Context';
import useApi from '../Hooks/useApi';

export default function CategoryButton(prop) {
  const { setCategory, setRenderSearch, setRenderByIngredient } = useContext(Context);
  const [name, setName] = useState();
  const { url, type } = prop;
  const categoryData = useApi(url, type);
  const NUMBER = 5;

  function returnCaregory({ target }, category) {
    if (name !== target.name) {
      setName(target.name);
      setCategory(category);
      setRenderSearch(false);
      setRenderByIngredient(false);
      return;
    }
    setCategory('');
    setName('');
  }

  function returnAll() {
    setCategory('');
    setRenderSearch(false);
    setRenderByIngredient(false);
  }

  return (
    <section>
      {
        categoryData !== undefined && (
          categoryData[type].map((categoryMap, index) => (
            index < NUMBER && (
              <button
                type="button"
                key={ categoryMap.strCategory }
                name={ categoryMap.strCategory }
                data-testid={ `${categoryMap.strCategory}-category-filter` }
                onClick={ (event) => returnCaregory(event, categoryMap.strCategory) }
              >
                {categoryMap.strCategory}
              </button>
            )
          ))
        )
      }
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ returnAll }
      >
        All
      </button>
    </section>
  );
}
