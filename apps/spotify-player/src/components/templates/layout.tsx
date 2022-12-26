import { ReactNode, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/state/hooks';
import {
  fetchFavorites,
  fetchOncePlaylist,
  selectPlayingTrack,
} from 'src/state/reducers';
import NavBar from '../molecules/NavBar/nav-bar';
import Player from '../organisms/Player/player';

export function Layout({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOncePlaylist());
    dispatch(fetchFavorites());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playingTrack = useAppSelector(selectPlayingTrack);
  let player: ReactNode | null = null;

  if (playingTrack != null) {
    player = <Player track={playingTrack} />;
  }

  return (
    <div className="app">
      <div className="container-fluid" style={{ marginBottom: 150 }}>
        {children}
        <div className="fixed-bottom">
          {player}
          <NavBar />
        </div>
      </div>
    </div>
  );
}

export default Layout;