import { Track } from '@spotify-player/api';
import { useState } from 'react';
import DataGrid from './DataGrid/data-grid';
import Hero from './Hero/hero';
import styles from './display-playlist.module.scss';
import SearchInput from './SearchInput/SearchInput';

/* eslint-disable-next-line */
export interface PlaylistProps {
  tracks: (Track & { isLiked: boolean })[];
  playingTrackId: string | null;
  playlist: { name: string; imageUrl?: string };
  handlePlay: (trackId: string) => void;
  handleFav: (trackId: string) => void;
  handlePlayAll: () => void;
}

export function DisplayPlaylist({
  tracks,
  playingTrackId,
  handlePlay,
  handleFav,
  handlePlayAll,
  playlist,
}: PlaylistProps) {
  const [serchedTerm, setSerchedTerm] = useState('');

  const filteredTracks = tracks.filter((track) =>
    filterTrack(track, serchedTerm)
  );

  return (
    <div className={styles['container']}>
      <Hero
        name={playlist.name}
        imageUrl={playlist.imageUrl}
        handlePlayAll={handlePlayAll}
      />
      <div className="row">
        <div className="col-auto ms-auto">
          <SearchInput
            onChange={(term) => {
              setSerchedTerm(term);
            }}
          />
        </div>
      </div>
      <DataGrid
        tracks={filteredTracks}
        playingTrackId={playingTrackId}
        handleFav={handleFav}
        handlePlay={handlePlay}
      />
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
  if (term === '') {
    return true;
  }

  const normalizedTerm = term.toLowerCase();
  return [track.name, track.album.name, ...track.artists].some((item) =>
    item.toLowerCase().includes(normalizedTerm)
  );
}

export default DisplayPlaylist;
