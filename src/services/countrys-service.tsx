const URL = 'http://localhost:4000/countries';

export async function loadCountries(): Promise<string[]> {
  return fetch(`${URL}`).then((res) => res.json());
}
