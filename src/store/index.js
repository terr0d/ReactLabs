import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import feedbackReducer from './feedbackSlice';
import profileReducer from './profileSlice';
import usersReducer from './usersSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    feedback: feedbackReducer,
    profile: profileReducer,
    users: usersReducer 
  }
});

export default store;