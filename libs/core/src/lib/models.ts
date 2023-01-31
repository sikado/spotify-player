import { PlaylistTrack, Track } from './generated-types';

export interface LikedPlaylistTrack extends PlaylistTrack {
  track: Track & { isLiked: boolean };
}
