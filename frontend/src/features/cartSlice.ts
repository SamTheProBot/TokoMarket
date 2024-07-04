import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface UserState {
  item: [
    {
      id: string;
      count: number;
    }
  ];
}

const initialState: UserState = {
  item: [
    {
      id: '',
      count: 0,
    },
  ],
};

export const userCart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    AddToCart: (state, action: PayloadAction<string | null>) => {
      state.value = true;
      state.access_token = action.payload;
    },
    RemoveToCart: (state) => {
      state.value = false;
      state.access_token = null;
    },
  },
});

export default userCart.reducer;
