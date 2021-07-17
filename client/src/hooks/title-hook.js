import { useEffect, useState } from 'react';

export const useTitle = (data) => {
  const [title, setTitle] = useState(data);

  useEffect(() => {
    document.title = title;
  }, [title]);

  return [title, setTitle];
};
