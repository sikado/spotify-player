import { useState } from 'react';
import SearchInput from 'src/components/atoms/SearchInput/SearchInput';
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
  const [serchedTerm, setSerchedTerm] = useState('');

  let tBody: JSX.Element | JSX.Element[] = (
    <tr>
      <th rowSpan={5}>Playlist vide</th>
    </tr>
  );

  if (tracks && tracks.length > 0) {
    tBody = tracks
      .filter((track) => filterTrack(track, serchedTerm))
      .map((track) => (
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
      <div className="row">
        <div className="col-auto ms-auto">
          <SearchInput
            onChange={(term) => {
              setSerchedTerm(term);
            }}
          />
        </div>
      </div>
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

/**
 * return true if term is undefined or empty or the track contains the serched term
 * @param track
 * @param term
 * @returns
 */
function filterTrack(track: Track, term: string): boolean {
  if (term == '') {
    return true;
  }

  const normalizedTerm = term.toLowerCase();
  return [track.name, track.album.name, ...track.artists].some((item) =>
    item.toLowerCase().includes(normalizedTerm)
  );
}

export default DataGrid;
