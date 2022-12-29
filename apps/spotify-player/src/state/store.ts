import { configureStore } from '@reduxjs/toolkit';
import playlistSlice from './slices/playlist';

export const store = configureStore({
  reducer: {
    plalistSlice: playlistSlice,
  },
  devTools: process.env.NODE_ENV === 'development',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
