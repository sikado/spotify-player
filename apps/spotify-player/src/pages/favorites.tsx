import DataGrid from 'src/components/molecules/DataGrid/data-grid';
import { useAppDispatch, useAppSelector } from 'src/state/hooks';
import {
  playTrack,
  selectFavoritesTracks,
  toggleFavoriteTrack,
} from 'src/state/slices/playlist';
import Hero from '../components/molecules/Hero/hero';
import styles from './favorites.module.scss';

/* eslint-disable-next-line */
export interface FavoritesProps {}

export function Favorites(props: FavoritesProps) {
  const favoritesTracks = useAppSelector(selectFavoritesTracks);

  const dispatch = useAppDispatch();

  return (
    <div className={styles['container']}>
      <Hero name="Favorites" />
      <main>
        {favoritesTracks == null || favoritesTracks.length === 0 ? (
          <h3>No tracks to display</h3>
        ) : (
          <DataGrid
            tracks={favoritesTracks}
            handlePlay={(trackId) => {
              dispatch(playTrack(trackId));
            }}
            handleFav={(trackId) => {
              dispatch(toggleFavoriteTrack(trackId));
            }}
          />
        )}
      </main>
    </div>
  );
}

export default Favorites;
