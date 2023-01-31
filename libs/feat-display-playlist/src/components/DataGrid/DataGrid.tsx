import { LikedPlaylistTrack } from '@spotify-player/core';
import DataRow from '../DataRow/DataRow';
import styles from './DataGrid.module.scss';

function RowPlaceholder() {
  const cell = (
    <td>
      <span className="placeholder w-75" />
    </td>
  );

  return (
    <tr className="placeholder-glow">
      {cell}
      {cell}
      {cell}
      {cell}
      {cell}
      {cell}
    </tr>
  );
}

export interface DataGridProps {
  playlistTracks: LikedPlaylistTrack[] | null;
  playingTrackId: string | null;
  onPlay: (trackId: string) => void;
  onFav: (trackId: string) => void;
}

export function DataGrid({ playlistTracks, playingTrackId, onPlay, onFav }: DataGridProps) {
  let tBody: JSX.Element | JSX.Element[] | null = null;

  if (playlistTracks && playlistTracks.length > 0) {
    tBody = playlistTracks.map((playlistTrack) => (
      <DataRow
        key={playlistTrack.track.id}
        playlistTrack={playlistTrack}
        isPlaying={playingTrackId === playlistTrack.track.id}
        onPlay={onPlay}
        onFav={onFav}
      />
    ));
  } else if (playlistTracks?.length === 0) {
    tBody = (
      <tr>
        <td colSpan={10}>Playlist vide</td>
      </tr>
    );
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
        {tBody != null ? (
          <tbody className="table-group-divider">{tBody}</tbody>
        ) : (
          <tbody>
            <RowPlaceholder />
            <RowPlaceholder />
            <RowPlaceholder />
            <RowPlaceholder />
          </tbody>
        )}
      </table>
    </div>
  );
}

export default DataGrid;
