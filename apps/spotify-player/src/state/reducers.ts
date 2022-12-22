import { GetPlaylistDocument, gql_GetPlaylistQuery } from "@/generated-types";
import { createAsyncThunk, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { client } from "src/data-access/apollo-client";
import { RootState } from "./store";

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
}

export interface MainState {
  playlist: Playlist | null,
  isLoading: boolean,
  favoritesTracksIds: string[],
  playingTrackId: string | null,
}

const initialState: MainState = {
  playlist: null,
  isLoading: false,
  favoritesTracksIds: [],
  playingTrackId: null
}

export const fetchOncePlaylist = createAsyncThunk('mainState/fetchPlaylist',
  async () => {

    const { data } = await client.query<gql_GetPlaylistQuery>({
      query: GetPlaylistDocument,
    })

    const playlist: Playlist = {
      id: data.playlist.id,
      name: data.playlist.name,
      imageUrl: data.playlist.images?.[0]?.url,
      tracks: data.playlist.tracks?.reduce<Track[]>((acc, playlistTrack) => {
        // Filtering out every playlistTracks without track and without preview_url
        if (playlistTrack?.track != null && playlistTrack.track.preview_url) {
          acc.push({
            name: playlistTrack.track.name,
            added_at: playlistTrack.added_at,
            album: { name: playlistTrack.track.album?.name ?? '', imageUrl: playlistTrack.track.album?.images?.[0]?.url },
            artists: playlistTrack.track.artists?.reduce<string[]>((acc, artist) => { if (artist != null) { acc.push(artist.name); } return acc }, []) ?? [],
            id: playlistTrack.track.id,
            preview_url: playlistTrack.track.preview_url
          });
        }
        return acc;

      }, []) ?? []
    }
    return playlist;
  })

export const mainSlice = createSlice({
  name: 'mainState',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchOncePlaylist.fulfilled, (state, action) =>
        ({ ...state, isLoading: false, playlist: action.payload }))
      .addCase(fetchOncePlaylist.pending, (state) => ({ ...state, isLoading: true }))
      .addCase(fetchOncePlaylist.rejected, (state, action) => {
        console.error(action.error)
        return { ...state, isLoading: false, playlist: null }
      })
  },
  reducers: {
    "addFavoriteTrack": (state, action: PayloadAction<string>) => {
      const likedTracks = new Set(state.favoritesTracksIds);

      // Only add track to favorites if it exists
      const track = state.playlist?.tracks.find(track => track.id === action.payload)
      if (track) {
        likedTracks.add(action.payload)
      }

      return { ...state, likedTracks: Array.from(likedTracks) }
    },
    "delFavoriteTrack": (state, action: PayloadAction<string>) => {
      const likedTracks = new Set(state.favoritesTracksIds);
      likedTracks.delete(action.payload)
      return { ...state, likedTracks: Array.from(likedTracks) }
    },
    "playTrack": (state, action: PayloadAction<string>) => {
      const playingTrack = state.playlist?.tracks.find(track => track.id === action.payload);

      if (playingTrack) {
        return {
          ...state,
          playingTrackId: action.payload
        }
      } else {
        return {
          ...state,
          playingTrackId: null
        }
      }
    },
    "playNextTrack": (state) => {
      // @todo
      throw new Error('🚧 Work in progress');
      return state;
    },
    "playPrevTrack": (state) => {
      // @todo
      throw new Error('🚧 Work in progress');
      return state;
    }
  }
})

// Actions
export const { addFavoriteTrack, delFavoriteTrack, playNextTrack, playPrevTrack, playTrack } = mainSlice.actions

// Selector
export const selectTracks = (state: RootState) => {
  // @todo add favorite flag
  return state.main.playlist?.tracks
}

export const selectMainState = (state: RootState) => {
  return state.main
}

export const selectPlayingTrack = createSelector([selectTracks, selectMainState], (tracks, { playingTrackId }) => {

  const playingTrack = tracks?.find(track => track.id === playingTrackId)

  if (playingTrackId == null || playingTrack == null) {
    return null
  }

  return playingTrack
});

export const selectFavoritesTracks = createSelector([selectTracks, selectMainState], (tracks, { favoritesTracksIds }) => {
  return tracks?.filter(track => favoritesTracksIds.includes(track.id))
});



export default mainSlice.reducer
