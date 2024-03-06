import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  currentUser: String | null,
  loading: boolean,
  error: boolean | Object,
};

const initialState: User = {
  currentUser: '',
  loading: false,
  error: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action: PayloadAction<string>) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    signInFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOut: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signOut,
} = userSlice.actions;

export default userSlice.reducer;
