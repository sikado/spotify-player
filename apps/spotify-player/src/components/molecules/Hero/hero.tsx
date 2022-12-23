import Image from 'next/image';
import styles from './hero.module.scss';

export interface HeroProps {
  name: string;
  imageUrl?: string;
}

export function Hero({ name, imageUrl }: HeroProps) {
  return (
    <div className={styles['container'] + ' row'}>
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
      <div className="col">
        <small className="text-muted">Playlist</small>
        <h1>{name}</h1>
        <button className="btn btn-outline-primary btn-sm">Play</button>
      </div>
    </div>
  );
}

export default Hero;
