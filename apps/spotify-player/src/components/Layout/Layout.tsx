import { ReactNode, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import {
  fetchFavorites,
  fetchOncePlaylist,
  playNextTrack,
  playPrevTrack,
  selectCanSkipNext,
  selectCanSkipPrev,
  selectPlayingTrack,
} from '../../state/slices/playlist';
import NavBar from '../NavBar/NavBar';
import Player from '@spotify-player/feat-player';

export function Layout({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOncePlaylist());
    dispatch(fetchFavorites());
  }, [dispatch]);

  const playingTrack = useAppSelector(selectPlayingTrack);

  const canSkipNext = useAppSelector(selectCanSkipNext);
  const canSkipPrev = useAppSelector(selectCanSkipPrev);

  let player: ReactNode | null = null;
  let marginBottom = 50;

  if (playingTrack != null) {
    player = (
      <Player
        track={playingTrack}
        canSkipNext={canSkipNext}
        onSkipNext={() => {
          dispatch(playNextTrack());
        }}
        canSkipPrev={canSkipPrev}
        onSkipPrev={() => {
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
