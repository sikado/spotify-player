import { PlaylistTrack } from '@/generated-types';
import styles from './data-row.module.scss';

export interface DataRowProps {
  playlistTrack: PlaylistTrack;
}

export function DataRow({ playlistTrack }: DataRowProps) {
  return (
    <tr key={playlistTrack.track.id} className={styles['container']}>
      <td>❤️</td>
      <td>{playlistTrack.track.name}</td>
      <td>
        {playlistTrack.track.artists
          ?.map((artist) => artist?.name)
          .join(', ') ?? ''}
      </td>
      <td>{playlistTrack.track.album?.name ?? ''}</td>
      <td>{playlistTrack.added_at}</td>
    </tr>
  );
}

export default DataRow;
