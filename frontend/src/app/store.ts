import { configureStore } from '@reduxjs/toolkit';
import UserLogin from '../features/userSlice';

export const store = configureStore({
  reducer: {
    logger: UserLogin,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
