import { API_URI } from '@spotify-player/core';
import fetch from 'cross-fetch';

const fetcher = <T = unknown>(query: string): Promise<T> =>
  fetch(API_URI, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then((json) => json.data);

export default fetcher;
