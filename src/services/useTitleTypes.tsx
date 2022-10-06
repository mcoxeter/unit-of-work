import { useEffect, useState } from 'react';
import { loadTitleTypes } from './title-types-service';

export const useTitleTypes = (): string[] => {
  const [titleTypes, setTitleTypes] = useState<string[]>([]);
  useEffect(() => {
    loadTitleTypes().then(setTitleTypes);
  }, []);

  return titleTypes;
};
