import { GetPlaylistQuery, Playlist, queryGetPlaylist } from '@spotify-player/core';
import fetcher from '../utils/fetcher';

// eslint-disable-next-line import/prefer-default-export
export async function fetchPlaylist(): Promise<{
  playlist: Playlist;
}> {
  const data = await fetcher<GetPlaylistQuery>(queryGetPlaylist);

  if (data.playlist == null) {
    throw new Error('Playlist unavailable');
  }

  return {
    playlist: {
      id: data.playlist.id,
      name: data.playlist.name,
      images: data.playlist.images,
      tracks: data.playlist.tracks,
    },
  };
}
