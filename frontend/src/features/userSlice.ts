import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface UserState {
  value: boolean;
  access_token: string | null;
}

const initialState: UserState = {
  value: false,
  access_token: null,
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
      state.access_token = action.payload.access_token;
    },
    logIn: (state, action: PayloadAction<string | null>) => {
      state.value = true;
      state.access_token = action.payload;
    },
    logOut: (state) => {
      state.value = false;
      state.access_token = null;
    },
  },
});

export const isLoggedIn = (state: RootState) => state.logger.value;
export const User_access_token = (state: RootState) =>
  state.logger.access_token;

export const { logIn, logOut, initialize } = UserLogin.actions;

export default UserLogin.reducer;
