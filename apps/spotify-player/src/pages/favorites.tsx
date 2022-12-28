import { useAppDispatch, useAppSelector } from '../state/hooks';
import {
  playAllTrack,
  playTrack,
  selectFavoritesTracks,
  selectPlayingTrackId,
  toggleFavoriteTrack,
} from '../state/slices/playlist';
import DisplayPlaylist from '@spotify-player/feat-display-playlist';
import styles from './favorites.module.scss';

/* eslint-disable-next-line */
export interface FavoritesProps {}

export function Favorites(_props: FavoritesProps) {
  const tracks = useAppSelector(selectFavoritesTracks);
  const playingTrackId = useAppSelector(selectPlayingTrackId);

  const playlist = {
    name: 'Favorites',
  };

  const dispatch = useAppDispatch();

  //@todo handle properly play from the liked playlist

  return (
    <div className={styles['container']}>
      {tracks == null ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <main>
            <DisplayPlaylist
              tracks={tracks}
              playingTrackId={playingTrackId}
              playlist={playlist}
              handlePlay={(trackId: string) => {
                dispatch(playTrack({ tracks, trackId }));
              }}
              handleFav={(trackId: string) => {
                dispatch(toggleFavoriteTrack(trackId));
              }}
              handlePlayAll={() => {
                if (tracks.length > 0) {
                  dispatch(playAllTrack(tracks));
                }
              }}
            />
          </main>
        </>
      )}
    </div>
  );
}

export default Favorites;
