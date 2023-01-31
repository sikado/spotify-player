import { Playlist } from '@spotify-player/core';
import DisplayPlaylist from '@spotify-player/feat-display-playlist';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import {
  playAllTrack,
  playTrack,
  selectFavoritesTracks,
  selectPlayingTrackId,
  toggleFavoriteTrack,
} from '../state/slices/playlist';
import styles from './favorites.module.scss';

export function Favorites() {
  const playlistTracks = useAppSelector(selectFavoritesTracks);
  const playingTrackId = useAppSelector(selectPlayingTrackId);

  // TODO handle "fav" playlist cleaner
  const playlist: Playlist = {
    id: '',
    name: 'Favorites',
  };

  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <main>
        <DisplayPlaylist
          playlistTracks={playlistTracks}
          playingTrackId={playingTrackId}
          playlist={playlist}
          onPlay={(trackId: string) => {
            if (playlistTracks) {
              dispatch(playTrack({ playlistTracks, trackId }));
            }
          }}
          onFav={(trackId: string) => {
            dispatch(toggleFavoriteTrack(trackId));
          }}
          onPlayAll={() => {
            if (playlistTracks && playlistTracks.length > 0) {
              dispatch(playAllTrack(playlistTracks));
            }
          }}
        />
      </main>
    </div>
  );
}

export default Favorites;
