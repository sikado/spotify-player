import styles from './index.module.scss';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import {
  playTrack,
  selectPlayingTrackId,
  selectPlaylistInfo,
  selectTracks,
  toggleFavoriteTrack,
} from '../state/slices/playlist';
import { Playlist } from '@spotify-player/playlist';

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
          <Playlist
            tracks={tracks}
            playingTrackId={playingTrackId}
            playlist={playlist}
            handlePlay={(trackId: string) => {
              dispatch(playTrack(trackId));
            }}
            handleFav={(trackId: string) => {
              dispatch(toggleFavoriteTrack(trackId));
            }}
            handlePlayAll={() => {
              if (tracks.length > 0) {
                dispatch(playTrack(tracks[0].id));
              }
            }}
          />
        </main>
      )}
    </div>
  );
}

export default Index;
