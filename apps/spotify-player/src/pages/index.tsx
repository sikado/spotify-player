import styles from './index.module.scss';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import {
  playAllTrack,
  playTrack,
  selectPlayingTrackId,
  selectPlaylistInfo,
  selectTracks,
  toggleFavoriteTrack,
} from '../state/slices/playlist';
import DisplayPlaylist from '@spotify-player/feat-display-playlist';

export function Index() {
  const dispatch = useAppDispatch();

  const playlist = useAppSelector(selectPlaylistInfo);
  const tracks = useAppSelector(selectTracks);
  const playingTrackId = useAppSelector(selectPlayingTrackId);

  return (
    <div className={styles.page}>
      {playlist == null || tracks == null ? (
        <h2>Loading...</h2>
      ) : (
        <main>
          <DisplayPlaylist
            tracks={tracks}
            playingTrackId={playingTrackId}
            playlist={playlist}
            handlePlay={(trackId: string) => {
              dispatch(playTrack({ tracks, trackId }));
            }}
            handleFav={(trackId: string) => {
              dispatch(toggleFavoriteTrack(trackId));
            }}
            handlePlayAll={() => {
              if (tracks.length > 0) {
                dispatch(playAllTrack(tracks));
              }
            }}
          />
        </main>
      )}
    </div>
  );
}

export default Index;
