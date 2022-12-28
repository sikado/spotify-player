import styles from './small-track-display.module.scss';
import Image from 'next/image';
import { Track } from '@spotify-player/api';

/* eslint-disable-next-line */
export interface SmallTrackDisplayProps {
  track: Track;
  size?: 'sm' | 'md' | 'lg'; // Default to 'md'
}

export function SmallTrackDisplay({ track, size }: SmallTrackDisplayProps) {
  const albumCoverSrc: string | null = track.album.imageUrl ?? null;
  const displayArtists = track.artists.join(', ');

  let picSize: number;
  switch (size) {
    case 'lg':
      picSize = 180;
      break;
    case 'sm':
      picSize = 30;
      break;
    case 'md':
    default:
      picSize = 60;
  }

  return (
    <div className={styles.container}>
      <div className="row g-2 align-items-center">
        <div className="col-auto ms-auto">
          <div
            style={{
              position: 'relative',
              width: picSize + 'px',
              height: picSize + 'px',
            }}
          >
            {albumCoverSrc !== null ? (
              <Image
                data-cy="cover"
                src={albumCoverSrc}
                fill
                sizes={`(max-width: ${picSize}) 100vw`}
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
        </div>
        <div
          className="col text-truncate"
          style={{
            maxWidth: 150,
          }}
        >
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
