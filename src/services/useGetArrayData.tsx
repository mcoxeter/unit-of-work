import { useEffect, useState } from 'react';
import { loadArray } from './load-array-service';

export function useGetArrayData<T>(urlPath: T): T[] {
  const [data, setData] = useState<T[]>([]);
  useEffect(() => {
    loadArray<T>(urlPath).then(setData);
  }, [urlPath]);

  return data;
}
