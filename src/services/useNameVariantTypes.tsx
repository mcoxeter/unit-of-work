import { useEffect, useState } from 'react';
import { loadNameVariantTypes } from './name-variant-types-service';

export const useNameVariantTypes = (): string[] => {
  const [nameVariantTypes, setNameVariantTypes] = useState<string[]>([]);
  useEffect(() => {
    loadNameVariantTypes().then(setNameVariantTypes);
  }, []);

  return nameVariantTypes;
};
