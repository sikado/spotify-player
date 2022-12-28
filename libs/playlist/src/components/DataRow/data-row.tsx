import { Track } from '@spotify-player/api';
import styles from './data-row.module.scss';

export interface DataRowProps {
  track: Track & { isLiked: boolean };
  isPlaying: boolean;
  handlePlay: (trackId: string) => void;
  handleFav: (trackId: string) => void;
}

export function DataRow({
  track,
  isPlaying,
  handlePlay,
  handleFav,
}: DataRowProps) {
  const formatedDate = new Intl.DateTimeFormat('default', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(Date.parse(track.added_at));

  const heart = track.isLiked ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-heart-fill"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
      />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-heart"
      viewBox="0 0 16 16"
    >
      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
    </svg>
  );

  let trClassName = styles['container'];

  if (isPlaying) {
    trClassName += ' ' + styles['active'];
  }

  return (
    <tr key={track.id} className={trClassName}>
      <td onClick={() => handlePlay(track.id)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-play-fill"
          viewBox="0 0 16 16"
        >
          <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
        </svg>
      </td>
      <td onClick={() => handleFav(track.id)}>{heart}</td>
      <td className={styles['title'] + ' text-truncate'}>{track.name}</td>
      <td className="text-truncate">{track.artists.join(', ') ?? ''}</td>
      <td className="text-truncate">{track.album.name}</td>
      <td className="text-truncate">{formatedDate}</td>
    </tr>
  );
}

export default DataRow;
