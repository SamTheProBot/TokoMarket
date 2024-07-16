import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface UserState {
  amount: number | undefined;
}

const initialState: UserState = {
  amount: 0,
};

export const userCart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<number>) => {
      if (state.amount != undefined) state.amount += action.payload;
    },
    clearCart: (state) => {
      state.amount = 0;
    },
    removeToCart: (state, action: PayloadAction<number>) => {
      if (state.amount != undefined) state.amount -= action.payload;
    },
  },
});

export const totalAmount = (state: RootState) => state.cart.amount;

export const { addToCart, removeToCart, clearCart } = userCart.actions;

export default userCart.reducer;
