import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import feedbackReducer from './feedbackSlice';
import profileReducer from './profileSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    feedback: feedbackReducer,
    profile: profileReducer
  }
});

export default store;