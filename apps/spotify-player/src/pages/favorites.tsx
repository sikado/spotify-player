import { useAppDispatch, useAppSelector } from '../state/hooks';
import {
  playTrack,
  selectFavoritesTracks,
  selectPlayingTrackId,
  toggleFavoriteTrack,
} from '../state/slices/playlist';
import { Playlist } from '@spotify-player/playlist';
import styles from './favorites.module.scss';

/* eslint-disable-next-line */
export interface FavoritesProps {}

export function Favorites(_props: FavoritesProps) {
  const tracks = useAppSelector(selectFavoritesTracks);
  const playingTrackId = useAppSelector(selectPlayingTrackId);

  const playlist = {
    name: 'Favorits',
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
            <Playlist
              tracks={tracks}
              playingTrackId={playingTrackId}
              playlist={playlist}
              handlePlay={(trackId: string) => {
                dispatch(playTrack(trackId));
              }}
              handleFav={(trackId: string) => {
                dispatch(toggleFavoriteTrack(trackId));
              }}
              handlePlayAll={() => {
                if (tracks.length > 0) {
                  dispatch(playTrack(tracks[0].id));
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
