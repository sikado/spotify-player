import { ReactNode, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import {
  fetchFavorites,
  fetchOncePlaylist,
  playNextTrack,
  playPrevTrack,
  selectCanSkipNext,
  selectPlayingTrack,
} from '../../state/slices/playlist';
import NavBar from '../molecules/NavBar/nav-bar';
import Player from '../organisms/Player/player';

export function Layout({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOncePlaylist());
    dispatch(fetchFavorites());
  }, [dispatch]);

  const playingTrack = useAppSelector(selectPlayingTrack);

  const canSkipNext = useAppSelector(selectCanSkipNext);

  let player: ReactNode | null = null;
  let marginBottom = 50;

  if (playingTrack != null) {
    player = (
      <Player
        track={playingTrack}
        canSkipNext={canSkipNext}
        handleSkipNext={() => {
          dispatch(playNextTrack());
        }}
        handleSkipPrev={() => {
          dispatch(playPrevTrack());
        }}
      />
    );
    marginBottom = 150;
  }

  return (
    <div className="app">
      <div className="container-fluid" style={{ marginBottom }}>
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
