import { GetPlaylistQuery, PlaylistTrack } from '../../../generated-types';
import DataRow from '../DataRow/data-row';
import styles from './data-grid.module.scss';

export interface DataGridProps {
  tracks: GetPlaylistQuery['playlist']['tracks'];
}

export function DataGrid({ tracks }: DataGridProps) {
  let tBody: JSX.Element | JSX.Element[] = (
    <tr>
      <td rowSpan={5}>Playlist vide</td>
    </tr>
  );

  if (tracks && tracks.length > 0) {
    // @todo better typing
    tBody = tracks
      .filter((track): track is PlaylistTrack => track !== null)
      .map((playlistTrack) => (
        <DataRow key={playlistTrack.track.id} playlistTrack={playlistTrack} />
      ));
  }

  return (
    <div className={styles['container']}>
      <table>
        <thead>
          <tr>
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
