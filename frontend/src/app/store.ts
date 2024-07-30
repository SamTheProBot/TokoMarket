import { configureStore } from '@reduxjs/toolkit';
import userCart from '../features/cartSlice';
import userLogin from '../features/userSlice';
import userExtra from '../features/extraSlice';

export const store = configureStore({
  reducer: {
    logger: userLogin,
    cart: userCart,
    extra: userExtra,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
