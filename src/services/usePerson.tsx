import { useEffect, useState } from 'react';
import { PersonsItem } from '../auto-gen/interfaces';
import { loadPerson } from './person-service';

export const usePerson = (personId: number): PersonsItem | undefined => {
  const [person, setPerson] = useState<PersonsItem>();
  useEffect(() => {
    loadPerson(personId).then((x: PersonsItem) => setPerson(x));
  }, [personId]);

  return person;
};
