import { createSlice, nanoid } from '@reduxjs/toolkit';

interface UserState {
  value: boolean;
  userId?: string | number;
}

const initialState: UserState = {
  value: false,
  userId: undefined,
};

export const userLogin = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.value = true;
      state.userId = action.payload;
    },
    logOut: (state) => {
      state.value = false;
    },
  },
});
