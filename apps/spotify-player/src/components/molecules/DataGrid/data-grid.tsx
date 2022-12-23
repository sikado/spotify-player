import { Track } from 'src/state/reducers';
import DataRow from '../DataRow/data-row';
import styles from './data-grid.module.scss';

export interface DataGridProps {
  tracks: (Track & { isLiked: boolean })[];
  handlePlay: (trackId: string) => void;
  handleFav: (trackId: string) => void;
}

export function DataGrid({ tracks, handlePlay, handleFav }: DataGridProps) {
  let tBody: JSX.Element | JSX.Element[] = (
    <tr>
      <td rowSpan={5}>Playlist vide</td>
    </tr>
  );

  if (tracks && tracks.length > 0) {
    tBody = tracks.map((track) => (
      <DataRow
        key={track.id}
        track={track}
        handlePlay={handlePlay}
        handleFav={handleFav}
      />
    ));
  }

  return (
    <div className={styles['container']}>
      <table className="table table-hover table-dark">
        <thead>
          <tr>
            <td scope="col"></td>
            <td scope="col"></td>
            <td scope="col">Title</td>
            <td scope="col">Artiste</td>
            <td scope="col">Album</td>
            <td scope="col">Date</td>
          </tr>
        </thead>
        <tbody>{tBody}</tbody>
      </table>
    </div>
  );
}

export default DataGrid;
