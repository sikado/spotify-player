import { GetPlaylistDocument, gql_GetPlaylistQuery } from "../generated-types";
import { initializeApollo } from "../apollo-client";
import { Playlist, Track } from "./models";

const apolloClient = initializeApollo();

export async function fetchPlaylist(): Promise<Playlist> {
  const { data } = await apolloClient.query<gql_GetPlaylistQuery>({
    query: GetPlaylistDocument,
  })

  const playlist: Playlist = {
    id: data.playlist.id,
    name: data.playlist.name,
    imageUrl: data.playlist.images?.[0]?.url,
    tracks: data.playlist.tracks?.reduce<Track[]>((acc, playlistTrack) => {
      // Filtering out every playlistTracks without track and without preview_url
      if (playlistTrack?.track != null && playlistTrack.track.preview_url) {
        acc.push({
          name: playlistTrack.track.name,
          added_at: playlistTrack.added_at,
          album: { name: playlistTrack.track.album?.name ?? '', imageUrl: playlistTrack.track.album?.images?.[0]?.url },
          artists: playlistTrack.track.artists?.reduce<string[]>((acc, artist) => { if (artist != null) { acc.push(artist.name); } return acc }, []) ?? [],
          id: playlistTrack.track.id,
          preview_url: playlistTrack.track.preview_url,
          duration_ms: playlistTrack.track.duration_ms
        });
      }
      return acc;

    }, []) ?? []
  }
  return playlist;
}
