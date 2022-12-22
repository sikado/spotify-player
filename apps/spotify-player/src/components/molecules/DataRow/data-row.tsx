import { Track } from 'src/state/reducers';
import styles from './data-row.module.scss';

export interface DataRowProps {
  track: Track;
  handlePlay: (trackId: string) => void;
}

export function DataRow({ track, handlePlay }: DataRowProps) {
  return (
    <tr key={track.id} className={styles['container']}>
      <td onClick={() => handlePlay(track.id)}>▶️</td>
      <td>❤️</td>
      <td>{track.name}</td>
      <td>{track.artists.join(', ') ?? ''}</td>
      <td>{track.album.name}</td>
      <td>{track.added_at}</td>
    </tr>
  );
}

export default DataRow;
