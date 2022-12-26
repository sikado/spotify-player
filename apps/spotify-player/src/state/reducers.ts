import { createAsyncThunk, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchFavoritesIds, saveFavoritesIds } from "src/services/favorites/fetchFavorites";
import { fetchPlaylist, Playlist } from "src/services/playlist";
import { RootState } from "./store";

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

export const fetchOncePlaylist = createAsyncThunk(
  'mainState/fetchPlaylist',
  fetchPlaylist
)

export const fetchFavorites = createAsyncThunk('mainState/fetchFavoritesIds', fetchFavoritesIds)

export const toggleFavoriteTrack = createAsyncThunk<string[], string, { state: { main: MainState } }>(
  'mainState/toggleFavoriteTrack',
  async (toggledTrackId, { getState }) => {
    const favoritesTracksIds = new Set(getState().main.favoritesTracksIds);

    // If the track is already liked
    if (favoritesTracksIds.has(toggledTrackId)) {
      favoritesTracksIds.delete(toggledTrackId)
    } else {
      // Only add track to favorites if it exists
      if (getState().main.playlist?.tracks.find(track => track.id === toggledTrackId)) {
        favoritesTracksIds.add(toggledTrackId)
      }
    }

    await saveFavoritesIds(Array.from(favoritesTracksIds));

    return Array.from(favoritesTracksIds)
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
      .addCase(fetchFavorites.fulfilled, (state, { payload }) =>
        ({ ...state, favoritesTracksIds: payload }))
      .addCase(toggleFavoriteTrack.fulfilled, (state, { payload }) =>
        ({ ...state, favoritesTracksIds: payload }));
  },
  reducers: {
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
export const { playNextTrack, playPrevTrack, playTrack } = mainSlice.actions

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
