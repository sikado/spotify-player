import { useAudio } from 'react-use';
import { Track } from 'src/services/playlist';
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
    autoPlay: false,
  });

  const handlePlayToggle = () => {
    state.playing ? controls.pause() : controls.play();
  };

  const handleSkip = () => {
    return undefined;
  };

  return (
    <div className={styles['container'] + ' row align-items-center'}>
      <div>{audio}</div>
      <div className="col-auto">
        <SkipButton direction="prev" canSkip={false} onClick={handleSkip} />
        <PlayButton isPlaying={state.playing} onClick={handlePlayToggle} />
        <SkipButton direction="next" canSkip={false} onClick={handleSkip} />
      </div>
      <div className="col-4">
        <small>{Math.floor(state.time)}s</small>
        <div className="progress" style={{ height: '1px' }}>
          <div
            className="progress-bar"
            role="progressbar"
            aria-label="track progress"
            style={{ width: (state.time / state.duration) * 100 + '%' }}
            aria-valuenow={state.time}
            aria-valuemin={0}
            aria-valuemax={state.duration}
          ></div>
        </div>
        <small>{Math.floor(state.duration)}s</small>
      </div>
      <div className="col-auto ms-auto">
        <SmallTrackDisplay track={track} />
      </div>
    </div>
  );
}

export default Player;
