import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface UserState {
  value: boolean;
}

const initialState: UserState = {
  value: false,
};

export const UserLogin = createSlice({
  name: 'logger',
  initialState,
  reducers: {
    logIn: (state) => {
      state.value = true;
    },
    logOut: (state) => {
      state.value = false;
    },
  },
});

export const isLoggedIn = (state: RootState) => state.logger.value;

export const { logIn, logOut } = UserLogin.actions;

export default UserLogin.reducer;
