import { LikedPlaylistTrack, Playlist, Track } from '@spotify-player/core';
import { useEffect, useState } from 'react';
import DataGrid from './DataGrid/DataGrid';
import styles from './DisplayPlaylist.module.scss';
import Hero from './Hero/Hero';
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
  // TODO test filter on undefined album OR artists
  return (
    [track.name, track.album?.name, ...(track.artists?.map((a) => a?.name) ?? [])]
      .filter((i) => i != null)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .some((item) => item!.toLowerCase().includes(normalizedTerm))
  );
}

/* eslint-disable-next-line */
export interface PlaylistProps {
  playlistTracks: LikedPlaylistTrack[] | null;
  playingTrackId: string | null;
  playlist: Playlist | null;
  onPlay: (trackId: string) => void;
  onFav: (trackId: string) => void;
  onPlayAll: () => void;
}

export function DisplayPlaylist({ playlistTracks, playingTrackId, onPlay, onFav, onPlayAll, playlist }: PlaylistProps) {
  const [serchedTerm, setSerchedTerm] = useState('');
  const [totalDurationMs, setTotalDurationMs] = useState(0);
  const filteredTracks = playlistTracks?.filter(({ track }) => filterTrack(track, serchedTerm)) ?? null;

  useEffect(() => {
    if (playlistTracks) {
      setTotalDurationMs(() => playlistTracks.reduce((acc, { track }) => acc + (track.duration_ms ?? 0), 0));
    } else {
      setTotalDurationMs(0);
    }
  }, [playlistTracks]);

  return (
    <div className={styles.container}>
      <Hero
        playlist={playlist}
        trackCount={playlistTracks?.length ?? 0}
        totalDurationMs={totalDurationMs}
        onPlayAll={onPlayAll}
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
      <DataGrid playlistTracks={filteredTracks} playingTrackId={playingTrackId} onFav={onFav} onPlay={onPlay} />
    </div>
  );
}

export default DisplayPlaylist;
