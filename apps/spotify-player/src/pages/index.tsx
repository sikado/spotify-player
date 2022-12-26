import Hero from '../components/molecules/Hero/hero';
import styles from './index.module.scss';
import { useAppDispatch } from 'src/state/hooks';
import {
  playTrack,
  selectPlaylistInfo,
  selectTracks,
  toggleFavoriteTrack,
} from 'src/state/reducers';
import { useSelector } from 'react-redux';
import DataGrid from 'src/components/molecules/DataGrid/data-grid';

export function Index() {
  const dispatch = useAppDispatch();

  const playlist = useSelector(selectPlaylistInfo);
  const tracks = useSelector(selectTracks);

  return (
    <div className={styles.page}>
      {playlist == null || tracks == null ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <Hero name={playlist.name} imageUrl={playlist.imageUrl} />
          <main>
            <DataGrid
              tracks={tracks}
              handlePlay={(trackId: string) => {
                dispatch(playTrack(trackId));
              }}
              handleFav={(trackId: string) => {
                dispatch(toggleFavoriteTrack(trackId));
              }}
            />
          </main>
        </>
      )}
    </div>
  );
}

export default Index;
