import { PlaylistTrack } from '@/generated-types';
import styles from './data-row.module.scss';

export interface DataRowProps {
  playlistTrack: PlaylistTrack;
  handlePlay: (trackId: string) => void;
}

export function DataRow({ playlistTrack, handlePlay }: DataRowProps) {
  return (
    <tr key={playlistTrack.track.id} className={styles['container']}>
      <td onClick={() => handlePlay(playlistTrack.track.id)}>▶️</td>
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
