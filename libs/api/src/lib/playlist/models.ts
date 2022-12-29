export interface Album {
  name: string;
  imageUrl?: string;
}

export interface Playlist {
  id?: string;
  name: string;
  imageUrl?: string;
}

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
