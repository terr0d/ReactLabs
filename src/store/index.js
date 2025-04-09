import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from './authSlice';
import feedbackReducer from './feedbackSlice';
import profileReducer from './profileSlice';
import usersReducer from './usersSlice';
import { feedbackApi } from './feedbackApi';

const store = configureStore({
  reducer: {
    auth: authReducer,
    feedback: feedbackReducer,
    profile: profileReducer,
    users: usersReducer,
    [feedbackApi.reducerPath]: feedbackApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(feedbackApi.middleware)
});

setupListeners(store.dispatch);

export default store;