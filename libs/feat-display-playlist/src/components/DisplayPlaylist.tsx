import { Playlist, Track } from '@spotify-player/core';
import { useEffect, useState } from 'react';
import DataGrid from './DataGrid/DataGrid';
import styles from './DisplayPlaylist.module.scss';
import Hero from './Hero/hero';
import SearchInput from './SearchInput/SearchInput';

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
  return [track.name, track.album.name, ...track.artists].some((item) => item.toLowerCase().includes(normalizedTerm));
}

/* eslint-disable-next-line */
export interface PlaylistProps {
  tracks: Track[];
  playingTrackId: string | null;
  playlist: Playlist;
  onPlay: (trackId: string) => void;
  onFav: (trackId: string) => void;
  onPlayAll: () => void;
}

export function DisplayPlaylist({ tracks, playingTrackId, onPlay, onFav, onPlayAll, playlist }: PlaylistProps) {
  const [serchedTerm, setSerchedTerm] = useState('');
  const [totalDurationMs, setTotalDurationMs] = useState(0);
  const filteredTracks = tracks.filter((track) => filterTrack(track, serchedTerm));

  useEffect(() => {
    setTotalDurationMs(() => tracks.reduce((acc, val) => acc + val.durationMs, 0));
  }, [tracks]);

  return (
    <div className={styles.container}>
      <Hero playlist={playlist} trackCount={tracks.length} totalDurationMs={totalDurationMs} onPlayAll={onPlayAll} />
      <div className="row">
        <div className="col-auto ms-auto">
          <SearchInput
            onChange={(term) => {
              setSerchedTerm(term);
            }}
          />
        </div>
      </div>
      <DataGrid tracks={filteredTracks} playingTrackId={playingTrackId} onFav={onFav} onPlay={onPlay} />
    </div>
  );
}

export default DisplayPlaylist;
