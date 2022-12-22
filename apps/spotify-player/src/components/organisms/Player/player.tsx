import { useAudio } from 'react-use';
import { Track } from 'src/state/reducers';
import PlayButton from '../../atoms/PlayButton/play-button';
import SkipButton from '../../atoms/SkipButton/skip-button';
import SmallTrackDisplay from '../../molecules/SmallTrackDisplay/small-track-display';
import styles from './player.module.scss';

/* eslint-disable-next-line */
export interface PlayerProps {
  track: Track;
}

export function Player({ track }: PlayerProps) {
  const [audio, state, controls] = useAudio({
    src: track.preview_url,
    autoPlay: true,
  });

  const handlePlayToggle = () => {
    state.playing ? controls.pause() : controls.play();
  };

  const handleSkip = () => {
    return undefined;
  };

  return (
    <div className={styles['container']}>
      <div>{audio}</div>
      <h3>
        {state.time} / {state.duration}
      </h3>
      <SmallTrackDisplay track={track} />
      <SkipButton direction="prev" canSkip={false} onClick={handleSkip} />
      <PlayButton isPlaying={state.playing} onClick={handlePlayToggle} />
      <SkipButton direction="next" canSkip={false} onClick={handleSkip} />
    </div>
  );
}

export default Player;
