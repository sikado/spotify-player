import { useAudio } from 'react-use';
import PlayButton from '../../atoms/PlayButton/play-button';
import styles from './player.module.scss';

/* eslint-disable-next-line */
export interface PlayerProps {}

export function Player(props: PlayerProps) {
  const [audio, state, controls, ref] = useAudio({
    src: 'https://p.scdn.co/mp3-preview/3ac3740881839bbc955b9f32809bb452779e6b00?cid=b644138492164b009229f271bdc7b751',
  });

  const handleClick = () => {
    state.playing ? controls.pause() : controls.play();
  };

  return (
    <div className={styles['container']}>
      <div>{audio}</div>
      <h3>
        {state.time} / {state.duration}
      </h3>
      <PlayButton isPlaying={state.playing} onClick={handleClick} />
    </div>
  );
}

export default Player;
