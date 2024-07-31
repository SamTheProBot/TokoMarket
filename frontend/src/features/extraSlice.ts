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
    openPanal: (state) => {
      state.sidePanal = true;
    },
    closePanal: (state) => {
      state.sidePanal = false;
    },
    setOffset: (state, action: PayloadAction<number>) => {
      state.shopTopOffset = action.payload;
    },
  },
});

export const panalState = (state: RootState) => state.extra.sidePanal;
export const shopOffset = (state: RootState) => state.extra.shopTopOffset;

export const { openPanal, closePanal, setOffset } = userExtra.actions;

export default userExtra.reducer;
