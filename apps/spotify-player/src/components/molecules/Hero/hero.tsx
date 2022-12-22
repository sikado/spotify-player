import Image from 'next/image';
import styles from './hero.module.scss';

export interface HeroProps {
  name: string;
  imageUrl?: string;
}

export function Hero({ name, imageUrl }: HeroProps) {
  return (
    <div className={styles['container']}>
      <h1>Playlist {name}</h1>
      <div className="cover">
        {imageUrl ? (
          <Image src={imageUrl} width={240} height={240} alt="Playlist cover" />
        ) : null}
      </div>
    </div>
  );
}

export default Hero;
