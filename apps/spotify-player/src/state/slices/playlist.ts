import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchFavoritesIds, fetchPlaylist, saveFavoritesIds } from '@spotify-player/api';
import { Playlist, PlaylistTrack } from '@spotify-player/core';
import type { RootState } from '../store';

export const SLICE_NAME = 'playlist';

export interface PlaylistState {
  playlist: Omit<Playlist, 'tracks'> | null;
  playlistTracks: PlaylistTrack[] | null;
  favoritesTracksIds: string[];
  currentTrackId: string | null;
  currentPlaylistIds: string[];
}

const initialState: PlaylistState = {
  playlist: null,
  playlistTracks: null,
  favoritesTracksIds: [],
  currentTrackId: null,
  currentPlaylistIds: [],
};

export const fetchOncePlaylist = createAsyncThunk(`${SLICE_NAME}/fetchPlaylist`, fetchPlaylist);

export const fetchFavorites = createAsyncThunk(`${SLICE_NAME}/fetchFavoritesIds`, fetchFavoritesIds);

export const toggleFavoriteTrack = createAsyncThunk<string[], string, { state: { playlistSlice: PlaylistState } }>(
  `${SLICE_NAME}/toggleFavoriteTrack`,
  async (toggledTrackId, { getState }) => {
    const localState = getState().playlistSlice;

    const favoritesTracksIds = new Set(localState.favoritesTracksIds);

    // If the track is already liked
    if (favoritesTracksIds.has(toggledTrackId)) {
      favoritesTracksIds.delete(toggledTrackId);
    } else if (localState.playlistTracks?.find(({ track }) => track.id === toggledTrackId)) {
      // Add the track to favorites if it exists
      favoritesTracksIds.add(toggledTrackId);
    }

    await saveFavoritesIds(Array.from(favoritesTracksIds));

    return Array.from(favoritesTracksIds);
  }
);

export const playlistSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchOncePlaylist.fulfilled,
        (
          state,
          {
            payload: {
              playlist: { tracks, ...playlist },
            },
          }
        ) => ({
          ...state,
          playlist,
          playlistTracks: tracks ?? [],
        })
      )
      .addCase(fetchOncePlaylist.pending, (state) => ({
        ...state,
        playlist: null,
        playlistTracks: null,
      }))
      .addCase(fetchOncePlaylist.rejected, (state, action) => {
        console.error(action.error);
        return {
          ...state,
        };
      })
      .addCase(fetchFavorites.fulfilled, (state, { payload }) => ({
        ...state,
        favoritesTracksIds: payload,
      }))
      .addCase(toggleFavoriteTrack.fulfilled, (state, { payload }) => ({
        ...state,
        favoritesTracksIds: payload,
      }))
      .addCase(toggleFavoriteTrack.rejected, (state, { error }) => {
        console.error(error);

        return state;
      });
  },
  reducers: {
    playTrack: (
      state,
      { payload }: PayloadAction<{ trackId: string; playlistTracks: PlaylistTrack[] }>
    ): PlaylistState => {
      const currentPlaylistIds = payload.playlistTracks.map(({ track }) => track.id);

      return {
        ...state,
        currentPlaylistIds,
        currentTrackId: payload.trackId,
      };
    },
    playNextTrack: (state): PlaylistState => {
      if (state.currentTrackId == null || state.currentPlaylistIds.length === 0) {
        return state;
      }

      const currentTrackIndex = state.currentPlaylistIds.indexOf(state.currentTrackId);
      if (currentTrackIndex === -1 || currentTrackIndex === state.currentTrackId.length - 1) {
        return {
          ...state,
        };
      }

      return {
        ...state,
        currentTrackId: state.currentPlaylistIds[currentTrackIndex + 1],
      };
    },
    playPrevTrack: (state): PlaylistState => {
      if (state.currentTrackId == null || state.currentPlaylistIds.length === 0) {
        return state;
      }

      const currentTrackIndex = state.currentPlaylistIds.indexOf(state.currentTrackId);
      if (currentTrackIndex < 1) {
        return {
          ...state,
        };
      }

      return {
        ...state,
        currentTrackId: state.currentPlaylistIds[currentTrackIndex - 1],
      };
    },
  },
});

// Actions
export const { playNextTrack, playPrevTrack, playTrack } = playlistSlice.actions;
export const playAllTrack = (playlistTracks: PlaylistTrack[]) =>
  playTrack({ playlistTracks, trackId: playlistTracks[0]?.track.id });

// Selector
const selectPlaylistSlice = (state: RootState) => state.playlistSlice;

/** Select the playlist metadata */
export const selectPlaylistInfo = createSelector([selectPlaylistSlice], ({ playlist }) => playlist);

/** Select the playlist tracks with their like status */
export const selectPlaylistTracks = createSelector(
  [selectPlaylistSlice],
  ({ playlistTracks, favoritesTracksIds }) =>
    playlistTracks?.map((playlistTrack) => ({
      ...playlistTrack,
      track: {
        ...playlistTrack.track,
        isLiked: favoritesTracksIds.includes(playlistTrack.track.id),
      },
    })) ?? null
);

/** Select the currently playing track id */
export const selectPlayingTrackId = createSelector([selectPlaylistSlice], ({ currentTrackId }) => currentTrackId);

/** Select the currently playing track */
export const selectPlayingTrack = createSelector(
  [selectPlaylistTracks, selectPlayingTrackId],
  (playlistTracks, playingTrackId) => {
    const playingTrack = playlistTracks?.find(({ track }) => track.id === playingTrackId)?.track;

    if (playingTrackId == null || playingTrack == null) {
      return null;
    }

    return playingTrack;
  }
);

/** Select the favorite tracks */
// TODO use added_at for fav date
export const selectFavoritesTracks = createSelector(
  selectPlaylistTracks,
  (playlistTracks) =>
    playlistTracks
      ?.filter(({ track }) => track.isLiked)
      // eslint-disable-next-line camelcase
      .map((playlistTrack) => ({ ...playlistTrack, added_at: '' })) ?? null
);

/** Select the CanSkipNext flag */
export const selectCanSkipNext = createSelector(
  [selectPlaylistSlice],
  ({ currentTrackId, currentPlaylistIds }) =>
    currentTrackId != null && currentPlaylistIds.length - 1 > currentPlaylistIds.indexOf(currentTrackId)
);

/** Select the CanSkipPrev flag */
export const selectCanSkipPrev = createSelector(
  [selectPlaylistSlice],
  ({ currentPlaylistIds, currentTrackId }) => currentTrackId != null && currentPlaylistIds.indexOf(currentTrackId) > 0
);

export default playlistSlice.reducer;
