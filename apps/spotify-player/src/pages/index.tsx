import DisplayPlaylist from '@spotify-player/feat-display-playlist';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import {
  playAllTrack,
  playTrack,
  selectPlayingTrackId,
  selectPlaylistInfo,
  selectPlaylistTracks,
  toggleFavoriteTrack,
} from '../state/slices/playlist';
import styles from './index.module.scss';

export function Index() {
  const dispatch = useAppDispatch();

  const playlist = useAppSelector(selectPlaylistInfo);
  const playlistTracks = useAppSelector(selectPlaylistTracks);
  const playingTrackId = useAppSelector(selectPlayingTrackId);

  return (
    <div className={styles.page}>
      <main>
        <DisplayPlaylist
          playlistTracks={playlistTracks}
          playingTrackId={playingTrackId}
          playlist={playlist}
          onPlay={(trackId: string) => {
            if (playlistTracks) {
              dispatch(playTrack({ playlistTracks, trackId }));
            }
          }}
          onFav={(trackId: string) => {
            if (playlistTracks) {
              dispatch(toggleFavoriteTrack(trackId));
            }
          }}
          onPlayAll={() => {
            if (playlistTracks && playlistTracks.length > 0) {
              dispatch(playAllTrack(playlistTracks));
            }
          }}
        />
      </main>
    </div>
  );
}

export default Index;
