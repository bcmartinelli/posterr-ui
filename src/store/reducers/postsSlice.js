import { createSlice } from '@reduxjs/toolkit'

export const PostsLice = createSlice({
  name: 'posts',
  initialState: {
    list: []
  },
  reducers: {
    updatePostsList: (state, action) => {
      state.list = action.payload;
    },
  },
})

export const { updatePostsList } = PostsLice.actions

export default PostsLice.reducer