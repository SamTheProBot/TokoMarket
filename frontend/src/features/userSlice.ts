import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    initialize: (
      state,
      action: PayloadAction<{ value: boolean; access_token: any }>
    ) => {
      state.value = action.payload.value;
    },
    logIn: (state) => {
      state.value = true;
    },
    logOut: (state) => {
      state.value = false;
    },
  },
});

export const isLoggedIn = (state: RootState) => state.logger.value;

export const { logIn, logOut, initialize } = UserLogin.actions;

export default UserLogin.reducer;
