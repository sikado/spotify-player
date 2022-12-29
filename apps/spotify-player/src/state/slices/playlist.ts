import { createAsyncThunk, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchFavoritesIds, saveFavoritesIds, fetchPlaylist, Playlist, Track } from '@spotify-player/api';
import { RootState } from "../store";

export const SLICE_NAME = "playlist"

export interface PlaylistState {
  playlist: Playlist | null;
  tracks: Omit<Track, 'isLiked'>[] | null;
  favoritesTracksIds: string[];
  currentTrackId: string | null;
  currentPlaylistIds: string[];
  // isLoading: boolean,
}

const initialState: PlaylistState = {
  playlist: null,
  tracks: null,
  favoritesTracksIds: [],
  currentTrackId: null,
  currentPlaylistIds: [],
  // isLoading: false,
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
      if (localState.tracks?.find(track => track.id === toggledTrackId)) {
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
      .addCase(fetchOncePlaylist.fulfilled, (state, { payload }) =>
        ({ ...state, /* isLoading: false, */ playlist: payload.playlist, tracks: payload.tracks }))
      .addCase(fetchOncePlaylist.pending, (state) => ({ ...state /*, isLoading: true */ }))
      .addCase(fetchOncePlaylist.rejected, (state, action) => {
        console.error(action.error)
        return { ...state, /* isLoading: false, */ playlist: null }
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
    "playTrack": (state,
      { payload }: PayloadAction<{ trackId: string, tracks: Track[] }>):
      PlaylistState => {

      const currentPlaylistIds = payload.tracks.map(track => track.id)

      return {
        ...state,
        currentPlaylistIds,
        currentTrackId: payload.trackId
      }
    },
    "playNextTrack": (state): PlaylistState => {
      if (state.currentTrackId == null || state.currentPlaylistIds.length === 0) {
        return state;
      }

      const currentTrackIndex = state.currentPlaylistIds.indexOf(state.currentTrackId)
      if (currentTrackIndex === -1 || currentTrackIndex === state.currentTrackId.length - 1) {
        return {
          ...state,
        }
      }

      return {
        ...state,
        currentTrackId: state.currentPlaylistIds[currentTrackIndex + 1],
      }
    },
    "playPrevTrack": (state): PlaylistState => {
      if (state.currentTrackId == null || state.currentPlaylistIds.length === 0) {
        return state;
      }

      const currentTrackIndex = state.currentPlaylistIds.indexOf(state.currentTrackId)
      if (currentTrackIndex < 1) {
        return {
          ...state,
        }
      }

      return {
        ...state,
        currentTrackId: state.currentPlaylistIds[currentTrackIndex - 1],
      }
    }
  }
})

// Actions
export const { playNextTrack, playPrevTrack, playTrack } = playlistSlice.actions
export const playAllTrack = (tracks: Track[]) => {
  return playTrack({ tracks, trackId: tracks[0]?.id })
}


// Selector
const selectPlaylistSlice = (state: RootState) => {
  return state.plalistSlice
}

/** Select the playlist metadata */
export const selectPlaylistInfo = createSelector([selectPlaylistSlice], ({ playlist }) => {
  return playlist;
})

/** Select the playlist tracks with their like status */
export const selectTracks = createSelector([selectPlaylistSlice], ({ tracks, favoritesTracksIds }) => {
  return tracks?.map(track => ({ ...track, isLiked: favoritesTracksIds.includes(track.id) }))
})

/** Select the currently playing track id */
export const selectPlayingTrackId = createSelector([selectPlaylistSlice], ({ currentTrackId }) => currentTrackId)

/** Select the currently playing track */
export const selectPlayingTrack = createSelector([selectTracks, selectPlayingTrackId], (tracks, playingTrackId) => {

  const playingTrack = tracks?.find(track => track.id === playingTrackId)

  if (playingTrackId == null || playingTrack == null) {
    return null
  }

  return playingTrack
});

/** Select the favorite tracks */
export const selectFavoritesTracks = createSelector(selectTracks, (tracks) => {
  return tracks?.filter(track => track.isLiked)
});

/** Select the CanSkipNext flag */
export const selectCanSkipNext = createSelector([selectPlaylistSlice], ({ currentTrackId, currentPlaylistIds }) => currentTrackId != null && currentPlaylistIds.length - 1 > currentPlaylistIds.indexOf(currentTrackId))

/** Select the CanSkipPrev flag */
export const selectCanSkipPrev = createSelector([selectPlaylistSlice], ({ currentPlaylistIds, currentTrackId }) => currentTrackId != null && currentPlaylistIds.indexOf(currentTrackId) > 0)

export default playlistSlice.reducer
