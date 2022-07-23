import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import routerReducer from './reducers/routerSlice';
import configReducer from './reducers/configSlice';
import profileReducer from './reducers/profileSlice';
import postsReducer from './reducers/postsSlice';

export default configureStore({
    reducer: {
        user: userReducer,
        router: routerReducer,
        config: configReducer,
        profile: profileReducer,
        posts: postsReducer
    },
  })