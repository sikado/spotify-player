import Image from 'next/image';
import styles from './hero.module.scss';

export interface HeroProps {
  name: string;
  imageUrl?: string;
  trackCount: number;
  totalDuration_ms: number;
  handlePlayAll: () => void;
}

export function Hero({
  name,
  imageUrl,
  trackCount,
  totalDuration_ms,
  handlePlayAll,
}: HeroProps) {
  const totalDuration = {
    hours: Math.floor(totalDuration_ms / 1000 / 60 / 60),
    min: Math.floor(totalDuration_ms / 1000 / 60) % 60,
  };

  return (
    <header className={styles['container'] + ' row'}>
      <div className="col-auto">
        <div className="cover">
          {imageUrl ? (
            <Image
              src={imageUrl}
              width={120}
              height={120}
              alt="Playlist cover"
            />
          ) : null}
        </div>
      </div>
      <div className="col-auto">
        <small className="text-muted">Playlist</small>
        <h1>{name}</h1>
        <p>
          <small className="text-muted">
            {trackCount} songs - {totalDuration.hours} h {totalDuration.min} min
          </small>
        </p>
      </div>
      <div className="col align-self-end">
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={handlePlayAll}
        >
          Play
        </button>
      </div>
    </header>
  );
}

export default Hero;
