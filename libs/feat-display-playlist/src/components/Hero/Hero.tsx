import { Playlist } from '@spotify-player/core';
import Image from 'next/image';
import styles from './Hero.module.scss';

export interface HeroProps {
  playlist: Playlist | null;
  trackCount: number;
  totalDurationMs: number;
  onPlayAll: () => void;
}

export function Hero({ playlist, trackCount, totalDurationMs, onPlayAll }: HeroProps) {
  const totalDuration = {
    hours: Math.floor(totalDurationMs / 1000 / 60 / 60),
    min: Math.floor(totalDurationMs / 1000 / 60) % 60,
  };

  let coverImage = (
    <svg
      width={120}
      height={120}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Placeholder"
      preserveAspectRatio="xMidYMid slice"
      focusable="false"
    >
      <title>Placeholder</title>
      <rect width="100%" height="100%" fill="#868e96" />
    </svg>
  );

  const imageUrl = playlist?.images?.[0]?.url;
  if (imageUrl) {
    coverImage = <Image src={imageUrl} width={120} height={120} alt="Playlist cover" />;
  }

  return (
    <header className={`${styles.container} row`}>
      <div className="col-auto">
        <div className="cover">{coverImage}</div>
      </div>
      <div className="col-auto">
        <small className="text-muted">Playlist</small>
        {playlist ? (
          <>
            <h1>{playlist.name}</h1>
            <p>
              <small className="text-muted">
                {trackCount} songs - {totalDuration.hours} h {totalDuration.min} min
              </small>
            </p>
          </>
        ) : (
          <div className="placeholder-glow">
            <h3>
              <span className="placeholder" style={{ width: 200 }} />
            </h3>
            <p>
              <span className="placeholder w-75" />
            </p>
          </div>
        )}
        <button className="btn btn-outline-primary btn-sm" type="button" onClick={onPlayAll}>
          Play
        </button>
      </div>
    </header>
  );
}

export default Hero;
