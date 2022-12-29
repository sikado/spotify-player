import { configureStore } from '@reduxjs/toolkit';
import playlistSlice from './slices/playlist';

export const store = configureStore({
  reducer: {
    plalistSlice: playlistSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
