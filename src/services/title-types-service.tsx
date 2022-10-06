const URL = 'http://localhost:4000/titleTypes';

export async function loadTitleTypes(): Promise<string[]> {
  return fetch(`${URL}`).then((res) => res.json());
}
