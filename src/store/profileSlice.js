import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

// Обновление профиля пользователя
export const updateProfile = createAsyncThunk(
  "profile/update",
  async ({ userId, profileData }, { rejectWithValue, getState }) => {
    try {
      // Отправляем запрос без ожидания данных в ответе
      await axios.patch(`${API_URL}/users/edit/${userId}`, profileData);
      
      // Используем отправленные данные для обновления в Redux
      const { auth } = getState();
      const updatedUser = { ...auth.user, ...profileData };
      
      // Обновляем localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      // Возвращаем отправленные данные для обновления Redux store
      return profileData;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Ошибка обновления профиля"
      );
    }
  }
);


// Начальное состояние
const initialState = {
  loading: false,
  error: null,
  success: false
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearStatus: (state) => {
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProfile.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearStatus } = profileSlice.actions;
export default profileSlice.reducer;
