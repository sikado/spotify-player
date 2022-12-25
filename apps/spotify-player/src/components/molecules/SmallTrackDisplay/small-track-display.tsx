import styles from './small-track-display.module.scss';
import Image from 'next/image';
import { Track } from 'src/services/playlist';

/* eslint-disable-next-line */
export interface SmallTrackDisplayProps {
  track: Track;
}

export function SmallTrackDisplay({ track }: SmallTrackDisplayProps) {
  const albumCoverSrc: string | null = track.album.imageUrl ?? null;
  const displayArtists = track.artists.join(', ');

  return (
    <div className={styles.container}>
      <div className="row g-0">
        <div className="col-4">
          {albumCoverSrc !== null ? (
            <Image
              data-cy="cover"
              src={albumCoverSrc}
              width={60}
              height={60}
              alt="Album cover"
            />
          ) : (
            <svg
              width={60}
              height={60}
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Placeholder"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            >
              <title>Placeholder</title>
              <rect width="100%" height="100%" fill="#868e96"></rect>
            </svg>
          )}
        </div>
        <div className="col-8">
          <h5 data-cy="artists">{track.name}</h5>
          <p>
            <small data-cy="artists">{displayArtists}</small>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SmallTrackDisplay;
