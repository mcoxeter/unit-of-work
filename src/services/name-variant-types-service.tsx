const URL = 'http://localhost:4000/nameVariantTypes';

export async function loadNameVariantTypes(): Promise<string[]> {
  return fetch(`${URL}`).then((res) => res.json());
}
