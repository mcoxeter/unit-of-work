import { useEffect, useState } from 'react';
import { PersonsItem } from '../auto-gen/interfaces';
import { PersonContext } from './person-context';
import { savePerson } from './person-service';
import { usePerson } from './usePerson';

export interface PersonContextProviderProps {
  id: number;
  children: React.ReactNode;
}
export const PersonContextProvider = (props: PersonContextProviderProps) => {
  const [current, setCurrent] = useState<PersonsItem | undefined>(undefined);
  const [original, setOriginal] = useState<PersonsItem | undefined>(undefined);
  const originalPerson = usePerson(props.id);
  useEffect(() => {
    setCurrent(originalPerson);
    setOriginal(originalPerson);
  }, [originalPerson]);

  return (
    <PersonContext.Provider
      value={{
        isModified: () => deepCompare(current, original) === false,
        original: () => original,
        current: () => current,
        rollback: () => setCurrent(original),
        update: (value) => setCurrent(value),
        save: async () => {
          if (current) {
            await savePerson(current);
            setOriginal(current);
          }
        }
      }}
    >
      {props.children}
    </PersonContext.Provider>
  );
};

function deepCompare(x: object | undefined, y: object | undefined): boolean {
  if (x === y) return true;

  return JSON.stringify(x) === JSON.stringify(y);
}
