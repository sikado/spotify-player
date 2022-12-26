import DataGrid from 'src/components/molecules/DataGrid/data-grid';
import { useAppDispatch, useAppSelector } from 'src/state/hooks';
import {
  playTrack,
  selectFavoritesTracks,
  selectPlayingTrackId,
  toggleFavoriteTrack,
} from 'src/state/slices/playlist';
import Hero from '../components/molecules/Hero/hero';
import styles from './favorites.module.scss';

/* eslint-disable-next-line */
export interface FavoritesProps {}

export function Favorites(props: FavoritesProps) {
  const favoritesTracks = useAppSelector(selectFavoritesTracks);
  const playingTrackId = useAppSelector(selectPlayingTrackId);

  const dispatch = useAppDispatch();

  //@todo handle properly play from the liked playlist

  return (
    <div className={styles['container']}>
      {favoritesTracks == null ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <Hero
            name="Favorites"
            handlePlayAll={() => {
              if (favoritesTracks.length > 0) {
                dispatch(playTrack(favoritesTracks[0].id));
              }
            }}
          />
          <main>
            {favoritesTracks.length === 0 ? (
              <h3>No tracks to display</h3>
            ) : (
              <DataGrid
                tracks={favoritesTracks}
                playingTrackId={playingTrackId}
                handlePlay={(trackId) => {
                  dispatch(playTrack(trackId));
                }}
                handleFav={(trackId) => {
                  dispatch(toggleFavoriteTrack(trackId));
                }}
              />
            )}
          </main>
        </>
      )}
    </div>
  );
}

export default Favorites;
