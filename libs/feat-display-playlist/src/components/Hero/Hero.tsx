import { Playlist } from '@spotify-player/core';
import Image from 'next/image';
import styles from './Hero.module.scss';

export interface HeroProps {
  playlist: Playlist;
  trackCount: number;
  totalDurationMs: number;
  onPlayAll: () => void;
}

export function Hero({ playlist, trackCount, totalDurationMs, onPlayAll }: HeroProps) {
  const totalDuration = {
    hours: Math.floor(totalDurationMs / 1000 / 60 / 60),
    min: Math.floor(totalDurationMs / 1000 / 60) % 60,
  };

  return (
    <header className={`${styles.container} row`}>
      <div className="col-auto">
        <div className="cover">
          {playlist.imageUrl ? <Image src={playlist.imageUrl} width={120} height={120} alt="Playlist cover" /> : null}
        </div>
      </div>
      <div className="col-auto">
        <small className="text-muted">Playlist</small>
        <h1>{playlist.name}</h1>
        <p>
          <small className="text-muted">
            {trackCount} songs - {totalDuration.hours} h {totalDuration.min} min
          </small>
        </p>
      </div>
      <div className="col align-self-end">
        <button className="btn btn-outline-primary btn-sm" type="button" onClick={onPlayAll}>
          Play
        </button>
      </div>
    </header>
  );
}

export default Hero;
