import { GetPlaylistQuery } from '../../../generated-types';
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
    tBody = tracks
      .filter((track): track is NonNullable<typeof track> => track !== null)
      .map(({ track, added_at }) => (
        <tr key={track.id}>
          <td>❤️</td>
          <td>{track.name}</td>
          <td>
            {track.artists?.map((artist) => artist?.name).join(', ') ?? ''}
          </td>
          <td>{track.album?.name ?? ''}</td>
          <td>{added_at}</td>
        </tr>
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
