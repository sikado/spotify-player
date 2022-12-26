import { useAudio } from 'react-use';
import { Track } from 'src/services/playlist';
import PlayButton from '../../atoms/PlayButton/play-button';
import SkipButton from '../../atoms/SkipButton/skip-button';
import SmallTrackDisplay from '../../molecules/SmallTrackDisplay/small-track-display';
import styles from './player.module.scss';

/* eslint-disable-next-line */
export interface PlayerProps {
  track: Track;
  canSkipNext: boolean;
  handleSkipNext: () => void;
  handleSkipPrev: () => void;
}

export function Player({
  track,
  canSkipNext,
  handleSkipNext,
  handleSkipPrev,
}: PlayerProps) {
  const [audio, state, controls] = useAudio({
    src: track.preview_url,
    autoPlay: true,
    onEnded: () => {
      handleSkipNext();
    },
  });

  const handlePlayToggle = () => {
    state.playing ? controls.pause() : controls.play();
  };

  return (
    <div className={styles['container'] + ' row align-items-center rounded'}>
      <div>{audio}</div>
      <div className="col-auto">
        <div className="d-grid gap-2 d-md-block">
          <SkipButton
            direction="prev"
            canSkip={false}
            onClick={() => {
              handleSkipPrev();
            }}
          />
          <PlayButton isPlaying={state.playing} onClick={handlePlayToggle} />
          <SkipButton
            direction="next"
            canSkip={canSkipNext}
            onClick={() => {
              handleSkipNext();
            }}
          />
        </div>
      </div>
      <div className="col-4">
        <div className="row align-items-center g-2">
          <div className="col-auto">
            <small>{Math.floor(state.time)}s</small>
          </div>
          <div className="col">
            <div
              className="progress"
              style={{ height: '1px', backgroundColor: 'black' }}
            >
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
          </div>
          <div className="col-auto">
            <small>{Math.floor(state.duration)}s</small>
          </div>
        </div>
      </div>
      <div className="col-4 ms-auto">
        <SmallTrackDisplay track={track} />
      </div>
    </div>
  );
}

export default Player;
