const URL = 'http://localhost:4000';

export async function loadArray<T>(urlPath: T): Promise<T[]> {
  return fetch(`${URL}/${urlPath}`).then((res) => res.json());
}
