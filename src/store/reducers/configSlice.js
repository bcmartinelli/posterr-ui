import { createSlice } from '@reduxjs/toolkit'

export const ConfigSlice = createSlice({
  name: 'config',
  initialState: {
    profileIsLoaded: false,
    isFiltered: window.location.pathname.includes('/following') ? true : false,
    alertShowing: {isShowing: false, msg: ''}
  },
  reducers: {
    updateFilterStatus: (state, action) => {
      state.isFiltered = action.payload;
    },
    showAlert: (state, action) => {
      state.alertShowing = action.payload;
    },
    updateProfileLoaded: (state, action) => {
      state.profileIsLoaded = action.payload;
    },
  },
})

export const { updateFilterStatus, showAlert, updateProfileLoaded } = ConfigSlice.actions

export default ConfigSlice.reducer