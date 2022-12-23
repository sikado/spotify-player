import { ReactNode } from 'react';
import { useAppSelector } from 'src/state/hooks';
import { selectPlayingTrack } from 'src/state/reducers';
import NavBar from '../molecules/NavBar/nav-bar';
import Player from '../organisms/Player/player';

export function Layout({ children }: { children: ReactNode }) {
  const playingTrack = useAppSelector(selectPlayingTrack);
  let player: ReactNode | null = null;

  if (playingTrack != null) {
    player = <Player track={playingTrack} />;
  }

  return (
    <main className="app container-xl">
      {children}
      <div className="fixed-bottom">
        {player}
        <NavBar />
      </div>
    </main>
  );
}

export default Layout;
