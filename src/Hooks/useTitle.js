import { useEffect } from 'react';

export default function useTitle(title) {
  const { setTitle } = useContext(Context);
  useEffect(() => {
    setTitle(title);
  }, [title, setTitle]);
}
