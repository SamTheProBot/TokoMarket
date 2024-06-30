import { createSlice, nanoid } from '@reduxjs/toolkit';

interface UserState {
  item: string[];
}

const initialState: UserState = {
  item: [],
};

export const userLogin = createSlice({
  name: 'login',
  initialState,
  reducers: {},
});
