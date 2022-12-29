import { Track } from '@spotify-player/api';
import DataRow from '../DataRow/DataRow';
import styles from './DataGrid.module.scss';

export interface DataGridProps {
  tracks: Track[];
  playingTrackId: string | null;
  onPlay: (trackId: string) => void;
  onFav: (trackId: string) => void;
}

export function DataGrid({ tracks, playingTrackId, onPlay, onFav }: DataGridProps) {
  let tBody: JSX.Element | JSX.Element[] = (
    <tr>
      <td colSpan={10}>Playlist vide</td>
    </tr>
  );

  if (tracks && tracks.length > 0) {
    tBody = tracks.map((track) => (
      <DataRow key={track.id} track={track} isPlaying={playingTrackId === track.id} onPlay={onPlay} onFav={onFav} />
    ));
  }

  return (
    <div className={styles.container}>
      <table className="table table-hover align-middle">
        <thead>
          <tr>
            <th scope="col" aria-label="play" />
            <th scope="col" aria-label="like" />
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
