import { Track } from 'src/services/playlist';
import DataRow from '../DataRow/data-row';
import styles from './data-grid.module.scss';

export interface DataGridProps {
  tracks: (Track & { isLiked: boolean })[];
  playingTrackId: string | null;
  handlePlay: (trackId: string) => void;
  handleFav: (trackId: string) => void;
}

export function DataGrid({
  tracks,
  playingTrackId,
  handlePlay,
  handleFav,
}: DataGridProps) {
  let tBody: JSX.Element | JSX.Element[] = (
    <tr>
      <th rowSpan={5}>Playlist vide</th>
    </tr>
  );

  if (tracks && tracks.length > 0) {
    tBody = tracks.map((track) => (
      <DataRow
        key={track.id}
        track={track}
        isPlaying={playingTrackId === track.id}
        handlePlay={handlePlay}
        handleFav={handleFav}
      />
    ));
  }

  return (
    <div className={styles['container']}>
      <table className="table table-hover align-middle">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col">Title</th>
            <th scope="col">Artiste</th>
            <th scope="col">Album</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">{tBody}</tbody>
      </table>
    </div>
  );
}

export default DataGrid;
