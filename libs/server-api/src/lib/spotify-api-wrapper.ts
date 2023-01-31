import { Playlist, PlaylistTrack } from '@spotify-player/core';
import SpotifyWebApi from 'spotify-web-api-node';
import getSpotifyApi from './lib';

/* export async function getUserPlaylists(username: string): Promise<Playlist[]> {
  const spotifyApi = await getSpotifyApi();
  try {
    const { body } = await spotifyApi.getUserPlaylists(username);
    return body.items.map(convertSpotifyPlaylist);
  } catch (err) {
    console.error('Something went wrong!', err);
    throw new Error('Something went wrong!');
  }
} */

// eslint-disable-next-line import/prefer-default-export
export class SpotifyApiWrapper {
  // eslint-disable-next-line no-use-before-define
  private static instance: SpotifyApiWrapper | undefined;

  protected spotifyApi: SpotifyWebApi | undefined;

  private async auth() {
    this.spotifyApi = await getSpotifyApi();
  }

  private static async getInstance() {
    if (this.instance === undefined) {
      const instance = new this();
      await instance.auth();
      this.instance = instance;
    }

    return this.instance;
  }

  public static async getPlaylist(id: string): Promise<Playlist> {
    const instance = await SpotifyApiWrapper.getInstance();

    if (instance.spotifyApi === undefined) {
      throw new Error('API fetched before auth');
    }

    try {
      const { body: playlistBody } = await instance.spotifyApi.getPlaylist(id);

      const tracks: PlaylistTrack[] = playlistBody.tracks.items
        .filter((playlistTrack) => playlistTrack.track != null)
        .map((playlistTrack) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const track = playlistTrack.track!;
          return {
            // eslint-disable-next-line camelcase
            added_at: playlistTrack.added_at,
            track: {
              id: track.id,
              name: track.name,
              album: {
                id: track.album.id,
                name: track.album.name,
                images: track.album.images,
              },
              artists: track.artists.map((artist) => ({
                id: artist.id,
                name: artist.name,
              })),
              // eslint-disable-next-line camelcase
              duration_ms: track.duration_ms,
              href: track.href,
              popularity: track.popularity,
              // eslint-disable-next-line camelcase
              preview_url: track.preview_url,
            },
          };
        });

      return {
        id: playlistBody.id,
        name: playlistBody.name,
        images: playlistBody.images,
        tracks,
      };
    } catch (err) {
      console.error('Something went wrong!', err);
      throw new Error('Something went wrong!');
    }
  }
}
