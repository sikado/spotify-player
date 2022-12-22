import { Track } from '@/generated-types';
import styles from './small-track-display.module.scss';
import Image from 'next/image';

/* eslint-disable-next-line */
export interface SmallTrackDisplayProps {
  track: Track;
}

export function SmallTrackDisplay({ track }: SmallTrackDisplayProps) {
  const albumCoverSrc: string | null = track.album?.images?.[0]?.url ?? null;
  const displayArtists =
    track.artists?.map((artist) => artist?.name).join(', ') ?? '';

  return (
    <div className={styles.container + ' card border-0'}>
      <div className="row g-0">
        <div className="col-4">
          <div className="img-container">
            {albumCoverSrc !== null ? (
              <Image
                data-cy="cover"
                src={albumCoverSrc}
                fill
                alt="Album cover"
              />
            ) : (
              <svg
                width="100%"
                height="100%"
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
        <div className="col-8">
          <div className="card-body">
            <h5 className="card-title" data-cy="artists">
              {track.name}
            </h5>
            <p className="card-text">
              <small data-cy="artists">{displayArtists}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SmallTrackDisplay;
