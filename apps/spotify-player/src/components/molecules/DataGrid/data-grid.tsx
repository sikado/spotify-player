import { Track } from 'src/state/reducers';
import DataRow from '../DataRow/data-row';
import styles from './data-grid.module.scss';

export interface DataGridProps {
  tracks: Track[];
  handlePlay: (trackId: string) => void;
}

export function DataGrid({ tracks, handlePlay }: DataGridProps) {
  let tBody: JSX.Element | JSX.Element[] = (
    <tr>
      <td rowSpan={5}>Playlist vide</td>
    </tr>
  );

  if (tracks && tracks.length > 0) {
    tBody = tracks.map((track) => (
      <DataRow key={track.id} track={track} handlePlay={handlePlay} />
    ));
  }

  return (
    <div className={styles['container']}>
      <table>
        <thead>
          <tr>
            <td></td>
            <td></td>
            <td>Title</td>
            <td>Artiste</td>
            <td>Album</td>
            <td>Date</td>
          </tr>
        </thead>
        <tbody>{tBody}</tbody>
      </table>
    </div>
  );
}

export default DataGrid;
