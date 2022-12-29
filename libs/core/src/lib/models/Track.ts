import { Album } from './Album';

export interface Track {
  name: string;
  addedAt: string;
  id: string;
  previewUrl: string;
  artists: string[];
  album: Album;
  durationMs: number;
  isLiked: boolean;
}
