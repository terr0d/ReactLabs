import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

// Создаем slice для счетчика
const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1
  }
});

// Экспортируем actions
export const { increment, decrement } = counterSlice.actions;

// Создаем store
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
});

export default store;