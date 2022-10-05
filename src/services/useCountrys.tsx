import { useEffect, useState } from 'react';
import { loadCountries } from './countrys-service';

export const useCountries = (): string[] => {
  const [countries, setCountries] = useState<string[]>([]);
  useEffect(() => {
    loadCountries().then(setCountries);
  }, []);

  return countries;
};
