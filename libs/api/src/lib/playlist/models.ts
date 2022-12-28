export interface Album { name: string, imageUrl?: string }

export interface Playlist {
  id: string;
  name: string;
  imageUrl?: string;
  tracks: Track[]
}

export interface Track {
  name: string,
  added_at: string;
  id: string;
  preview_url: string;
  artists: string[];
  album: Album;
  duration_ms: number;
}

