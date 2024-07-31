import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface UserState {
  _id: string;
  name: string;
  image: string;
  price: number;
  count: number;
}

const initialState: UserState[] = [];

export const userCart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    initialdata: (state, action: PayloadAction<UserState>) => {
      state.push(action.payload);
    },
    addItem: (state, action: PayloadAction<UserState>) => {
      return [...state, action.payload];
    },
    removeItem: (state, action: PayloadAction<UserState>) => {
      return state.filter((prod) => prod._id !== action.payload._id);
    },
  },
});

export const cartList = (state: RootState) => state.cart;

export const { initialdata, addItem, removeItem } = userCart.actions;

export default userCart.reducer;
