import { Track } from '@spotify-player/core';
import Image from 'next/image';
import styles from './SmallTrackDisplay.module.scss';

/* eslint-disable-next-line */
export interface SmallTrackDisplayProps {
  track: Track;
  size?: 'sm' | 'md' | 'lg'; // Default to 'md'
}

export function SmallTrackDisplay({ track, size = 'md' }: SmallTrackDisplayProps) {
  const albumCoverSrc = track.album?.images?.[0]?.url ?? null;
  const displayArtists = track.artists?.map((a) => a?.name).join(', ');

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
              width: `${picSize}px`,
              height: `${picSize}px`,
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
                <rect width="100%" height="100%" fill="#868e96" />
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
          <h5>{track.name}</h5>
          {displayArtists ? (
            <p>
              <small data-cy="artists">{displayArtists}</small>
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default SmallTrackDisplay;
