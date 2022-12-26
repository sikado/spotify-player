import { createAsyncThunk, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchFavoritesIds, saveFavoritesIds } from "src/services/favorites/fetchFavorites";
import { fetchPlaylist, Playlist } from "src/services/playlist";
import { RootState } from "../store";

export const SLICE_NAME = "playlist"

export interface PlaylistState {
  playlist: Playlist | null,
  isLoading: boolean,
  favoritesTracksIds: string[],
  playingTrackId: string | null,
}

const initialState: PlaylistState = {
  playlist: null,
  isLoading: false,
  favoritesTracksIds: [],
  playingTrackId: null
}

export const fetchOncePlaylist = createAsyncThunk(
  SLICE_NAME + '/fetchPlaylist',
  fetchPlaylist
)

export const fetchFavorites = createAsyncThunk(SLICE_NAME + '/fetchFavoritesIds', fetchFavoritesIds)

export const toggleFavoriteTrack = createAsyncThunk<string[], string, { state: { plalistSlice: PlaylistState } }>(
  SLICE_NAME + '/toggleFavoriteTrack',
  async (toggledTrackId, { getState }) => {
    const localState = getState().plalistSlice

    const favoritesTracksIds = new Set(localState.favoritesTracksIds);

    // If the track is already liked
    if (favoritesTracksIds.has(toggledTrackId)) {
      favoritesTracksIds.delete(toggledTrackId)
    } else {
      // Only add track to favorites if it exists
      if (localState.playlist?.tracks.find(track => track.id === toggledTrackId)) {
        favoritesTracksIds.add(toggledTrackId)
      }
    }

    await saveFavoritesIds(Array.from(favoritesTracksIds));

    return Array.from(favoritesTracksIds)
  })

export const playlistSlice = createSlice({
  name: SLICE_NAME,
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
      .addCase(fetchFavorites.fulfilled, (state, { payload }) =>
        ({ ...state, favoritesTracksIds: payload }))
      .addCase(toggleFavoriteTrack.fulfilled, (state, { payload }) =>
        ({ ...state, favoritesTracksIds: payload }))
      .addCase(toggleFavoriteTrack.rejected, (state, { error }) => {
        console.error(error);

        return state;
      });
  },
  reducers: {
    "playTrack": (state, action: PayloadAction<string>): PlaylistState => {
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
    "playNextTrack": (state): PlaylistState => {
      // @todo
      throw new Error('🚧 Work in progress');
      return state;
    },
    "playPrevTrack": (state): PlaylistState => {
      // @todo
      throw new Error('🚧 Work in progress');
      return state;
    }
  }
})

// Actions
export const { playNextTrack, playPrevTrack, playTrack } = playlistSlice.actions

// Selector
const selectPlaylistSlice = (state: RootState) => {
  return state.plalistSlice
}

export const selectPlaylistInfo = createSelector([selectPlaylistSlice], ({ playlist }) => {
  if (playlist) {
    return { name: playlist.name, id: playlist.id, imageUrl: playlist.imageUrl }
  } else {
    return null
  }
})

export const selectTracks = createSelector([selectPlaylistSlice], ({ playlist, favoritesTracksIds }) => {
  return playlist?.tracks.map(track => ({ ...track, isLiked: favoritesTracksIds.includes(track.id) }))
})

export const selectPlayingTrackId = createSelector([selectPlaylistSlice], ({ playingTrackId }) => playingTrackId)

export const selectPlayingTrack = createSelector([selectTracks, selectPlayingTrackId], (tracks, playingTrackId) => {

  const playingTrack = tracks?.find(track => track.id === playingTrackId)

  if (playingTrackId == null || playingTrack == null) {
    return null
  }

  return playingTrack
});

export const selectFavoritesTracks = createSelector(selectTracks, (tracks) => {
  return tracks?.filter(track => track.isLiked)
});



export default playlistSlice.reducer
