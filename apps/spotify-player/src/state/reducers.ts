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
    "toggleFavoriteTrack": (state, action: PayloadAction<string>): MainState => {
      const favoritesTracksIds = new Set(state.favoritesTracksIds);

      // If the track is already liked
      if (favoritesTracksIds.has(action.payload)) {
        favoritesTracksIds.delete(action.payload)
      } else {
        // Only add track to favorites if it exists
        if (state.playlist?.tracks.find(track => track.id === action.payload)) {
          favoritesTracksIds.add(action.payload)
        }
      }

      return { ...state, favoritesTracksIds: Array.from(favoritesTracksIds) }
    },
    "playTrack": (state, action: PayloadAction<string>): MainState => {
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
    "playNextTrack": (state): MainState => {
      // @todo
      throw new Error('🚧 Work in progress');
      return state;
    },
    "playPrevTrack": (state): MainState => {
      // @todo
      throw new Error('🚧 Work in progress');
      return state;
    }
  }
})

// Actions
export const { toggleFavoriteTrack, playNextTrack, playPrevTrack, playTrack } = mainSlice.actions

// Selector
const selectMainState = (state: RootState) => {
  return state.main
}

export const selectPlaylistInfo = createSelector([selectMainState], ({ playlist }) => {
  if (playlist) {
    return { name: playlist.name, id: playlist.id, imageUrl: playlist.imageUrl }
  } else {
    return null
  }
})

export const selectTracks = createSelector([selectMainState], ({ playlist, favoritesTracksIds }) => {
  return playlist?.tracks.map(track => ({ ...track, isLiked: favoritesTracksIds.includes(track.id) }))
})

export const selectPlayingTrack = createSelector([selectTracks, selectMainState], (tracks, { playingTrackId }) => {

  const playingTrack = tracks?.find(track => track.id === playingTrackId)

  if (playingTrackId == null || playingTrack == null) {
    return null
  }

  return playingTrack
});

export const selectFavoritesTracks = createSelector(selectTracks, (tracks) => {
  return tracks?.filter(track => track.isLiked)
});



export default mainSlice.reducer
