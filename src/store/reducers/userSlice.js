import { createSlice } from '@reduxjs/toolkit'

export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    id: 1,
    name: 'Bruno C. Martinelli',
    username: 'martinelli4630',
    photo: '',
    createAt: '2021-03-21',
    followers: [],
    following: [],
    posts: []
  },
  reducers: {
    setUserProfile: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.photo = action.payload.photo;
      state.createAt = action.payload.createAt;
      state.followers = action.payload.followers;
      state.following = action.payload.following;
      state.posts = action.payload.posts;
    },    
    setFollowing: (state, action) => {
      state.following = action.payload.following;
    },   
    setFollowers: (state, action) => {
      state.followers = action.payload.followers;
    },
    setTotalPosts: (state, action) => {
      state.totalPosts = action.payload;
    },
  },
})


export const { setUserProfile, setFollowing, setFollowers, setTotalPosts } = UserSlice.actions

export default UserSlice.reducer