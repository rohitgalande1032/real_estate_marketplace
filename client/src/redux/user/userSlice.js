import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserStart: (state) => {
      state.loading = true
    },
    updateUserSuccess : (state, action) => {
      state.user = action.payload
      state.loading = false
      state.error = null
    }, 
    updateUserFailure: (state, action) => {
      state.error = action.payload
      state.loading = false
    }
  },
});


export const { signInStart, signInSuccess, signInFailure, updateUserStart, updateUserSuccess, updateUserFailure } = userSlice.actions;
export default userSlice.reducer;
