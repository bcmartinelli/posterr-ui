import { createSlice } from '@reduxjs/toolkit'

export const RouterSlice = createSlice({
  name: 'router',
  initialState: {
    pathname: '',
  },
  reducers: {
    setActiveRoute: (state, action) => {
      state.pathname = action.payload;
    },
  },
})

export const { setActiveRoute } = RouterSlice.actions

export default RouterSlice.reducer