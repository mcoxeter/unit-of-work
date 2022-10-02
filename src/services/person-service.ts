import { PersonsItem } from '../auto-gen/interfaces';

const URL = 'http://localhost:4000/persons';

export async function loadPerson(personId: number): Promise<PersonsItem> {
  return fetch(`${URL}/${personId}`).then((res) => res.json());
}

export async function savePerson(data: PersonsItem): Promise<void> {
  const fullUrl = `${URL}/${data.id}`;
  await fetch(fullUrl, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  });
}
