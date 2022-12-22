import DataGrid from 'src/components/molecules/DataGrid/data-grid';
import { useAppDispatch, useAppSelector } from 'src/state/hooks';
import { playTrack, selectFavoritesTracks } from 'src/state/reducers';
import Hero from '../components/molecules/Hero/hero';
import NavBar from '../components/molecules/NavBar/nav-bar';
import styles from './favorites.module.scss';

/* eslint-disable-next-line */
export interface FavoritesProps {}

export function Favorites(props: FavoritesProps) {
  const favoritesTracks = useAppSelector(selectFavoritesTracks);

  const dispatch = useAppDispatch();

  return (
    <div className={styles['container']}>
      <Hero name="Favorites" />
      {favoritesTracks == null || favoritesTracks.length === 0 ? (
        <h3>No tracks to display</h3>
      ) : (
        <DataGrid
          tracks={favoritesTracks}
          handlePlay={(trackId) => {
            dispatch(playTrack(trackId));
          }}
        />
      )}
      <NavBar />
    </div>
  );
}

export default Favorites;
