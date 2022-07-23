import { createSlice } from '@reduxjs/toolkit'

export const ProfileSlice = createSlice({
  name: 'profile',
  initialState: {
    isShowing: false,
    countPostByDay: 0,
  },
  reducers: {
    updateModalStatus: (state, action) => {
      state.isShowing = action.payload;
    },

    updateCountPostByDay: (state, action) => {
      state.countPostByDay = action.payload
    }
  },
})

export const { updateModalStatus, updateCountPostByDay } = ProfileSlice.actions

export default ProfileSlice.reducer