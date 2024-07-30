import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface extraState {
  sidePanal: boolean;
  shopTopOffset: number;
}

const initialState: extraState = {
  sidePanal: false,
  shopTopOffset: 0,
};

export const userExtra = createSlice({
  name: 'extra',
  initialState,
  reducers: {
    togglePanal: (state, actio),
  },
});

export default userExtra.reducer;
