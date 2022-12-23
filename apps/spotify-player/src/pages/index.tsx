import Hero from '../components/molecules/Hero/hero';
import NavBar from '../components/molecules/NavBar/nav-bar';
import styles from './index.module.scss';
import { useAppDispatch } from 'src/state/hooks';
import { playTrack, selectMainState } from 'src/state/reducers';
import { useSelector } from 'react-redux';
import DataGrid from 'src/components/molecules/DataGrid/data-grid';

export function Index() {
  const dispatch = useAppDispatch();

  const playlist = useSelector(selectMainState).playlist;

  const handlePlay = (trackId: string) => {
    dispatch(playTrack(trackId));
  };

  return (
    <div className={styles.page}>
      <div className="wrapper">
        <div className="container">
          {playlist == null ? (
            <h2>Loading...</h2>
          ) : (
            <>
              <Hero name={playlist.name} imageUrl={playlist.imageUrl} />
              <DataGrid tracks={playlist.tracks} handlePlay={handlePlay} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Index;
