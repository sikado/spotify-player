import { useAppSelector } from 'src/state/hooks';
import { selectPlayingTrack } from 'src/state/reducers';
import Player from '../organisms/Player/player';

export function PlayerTemplate() {
  const playingTrack = useAppSelector(selectPlayingTrack);

  if (playingTrack == null) {
    return null;
  }

  return <Player track={playingTrack} />;
}
