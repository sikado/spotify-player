import { Playlist } from '@spotify-player/api';
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
  const tracks = useAppSelector(selectFavoritesTracks);
  const playingTrackId = useAppSelector(selectPlayingTrackId);

  const playlist: Playlist = {
    name: 'Favorites',
  };

  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      {tracks == null ? (
        <h2>Loading...</h2>
      ) : (
        <main>
          <DisplayPlaylist
            tracks={tracks}
            playingTrackId={playingTrackId}
            playlist={playlist}
            onPlay={(trackId: string) => {
              dispatch(playTrack({ tracks, trackId }));
            }}
            onFav={(trackId: string) => {
              dispatch(toggleFavoriteTrack(trackId));
            }}
            onPlayAll={() => {
              if (tracks.length > 0) {
                dispatch(playAllTrack(tracks));
              }
            }}
          />
        </main>
      )}
    </div>
  );
}

export default Favorites;
