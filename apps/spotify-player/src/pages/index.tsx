import DisplayPlaylist from '@spotify-player/feat-display-playlist';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import {
  playAllTrack,
  playTrack,
  selectPlayingTrackId,
  selectPlaylistInfo,
  selectTracks,
  toggleFavoriteTrack,
} from '../state/slices/playlist';
import styles from './index.module.scss';

export function Index() {
  const dispatch = useAppDispatch();

  const playlist = useAppSelector(selectPlaylistInfo);
  const tracks = useAppSelector(selectTracks);
  const playingTrackId = useAppSelector(selectPlayingTrackId);

  return (
    <div className={styles.page}>
      <main>
        <DisplayPlaylist
          tracks={tracks}
          playingTrackId={playingTrackId}
          playlist={playlist}
          onPlay={(trackId: string) => {
            if (tracks) {
              dispatch(playTrack({ tracks, trackId }));
            }
          }}
          onFav={(trackId: string) => {
            if (tracks) {
              dispatch(toggleFavoriteTrack(trackId));
            }
          }}
          onPlayAll={() => {
            if (tracks && tracks.length > 0) {
              dispatch(playAllTrack(tracks));
            }
          }}
        />
      </main>
    </div>
  );
}

export default Index;
