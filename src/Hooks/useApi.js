import { useEffect, useState } from 'react';

export default function useApi(URL, path) {
  const [dataApi, setDataApi] = useState();

  useEffect(() => {
    const test = async () => {
      try {
        if (URL !== undefined) {
          const response = await fetch(URL);
          const data = await response.json();
          const type = (path.includes('/foods')) ? 'meals' : 'drinks';
          if (data[type] !== null) setDataApi(data);
          else {
            global.alert('Sorry, we haven\'t found any recipes for these filters.');
            setDataApi({ [type]: [] });
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    test();
  }, [URL, path]);
  return dataApi;
}
