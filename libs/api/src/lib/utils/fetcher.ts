import { API_URI } from '@spotify-player/core';
import fetch from 'cross-fetch';

const fetcher = <T = unknown>(sha256Hash: string): Promise<T> =>
  fetch(API_URI, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      extensions: { persistedQuery: { version: 1, sha256Hash } },
    }),
  })
    .then((res) => res.json())
    .then((json) => json.data);

export default fetcher;
