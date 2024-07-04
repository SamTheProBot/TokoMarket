import { configureStore } from '@reduxjs/toolkit';
import userCart from '../features/cartSlice';
import UserLogin from '../features/userSlice';

export const store = configureStore({
  reducer: {
    logger: UserLogin,
    cart: userCart,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
