import { initializeApollo } from '../apollo-client';
import { GetPlaylistDocument, gql_GetPlaylistQuery } from '../generated-types';
import { Playlist, Track } from './models';

const apolloClient = initializeApollo();

// eslint-disable-next-line import/prefer-default-export
export async function fetchPlaylist(): Promise<{
  playlist: Playlist;
  tracks: Omit<Track, 'isLiked'>[];
}> {
  const { data } = await apolloClient.query<gql_GetPlaylistQuery>({
    query: GetPlaylistDocument,
  });

  const tracks =
    data.playlist.tracks?.reduce<Omit<Track, 'isLiked'>[]>((acc, playlistTrack) => {
      // Filtering out every playlistTracks without track and without preview_url
      if (playlistTrack?.track != null && playlistTrack.track.preview_url) {
        acc.push({
          name: playlistTrack.track.name,
          addedAt: playlistTrack.added_at,
          album: {
            name: playlistTrack.track.album?.name ?? '',
            imageUrl: playlistTrack.track.album?.images?.[0]?.url,
          },
          artists:
            playlistTrack.track.artists?.reduce<string[]>((artistsName, artist) => {
              if (artist != null) {
                artistsName.push(artist.name);
              }
              return artistsName;
            }, []) ?? [],
          id: playlistTrack.track.id,
          previewUrl: playlistTrack.track.preview_url,
          durationMs: playlistTrack.track.duration_ms,
        });
      }
      return acc;
    }, []) ?? [];

  const playlist: Playlist = {
    id: data.playlist.id,
    name: data.playlist.name,
    imageUrl: data.playlist.images?.[0]?.url,
  };

  return { playlist, tracks };
}
