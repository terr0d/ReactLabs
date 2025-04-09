import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

// Получение всех отзывов
export const fetchFeedbacks = createAsyncThunk(
  'feedback/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/feedback/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || 'Ошибка получения отзывов');
    }
  }
);

// Создание нового отзыва
export const createFeedback = createAsyncThunk(
  'feedback/create',
  async (feedbackData, { rejectWithValue, getState, dispatch }) => {
    try {
      // Если пользователь авторизован, добавляем его ID
      const { auth } = getState();
      if (auth.user && auth.user.id) {
        feedbackData.user_id = auth.user.id;
      }
      
      const response = await axios.post(`${API_URL}/feedback/`, feedbackData);
      
      // После успешного создания отзыва обновляем весь список отзывов
      dispatch(fetchFeedbacks());
      
      // Возвращаем данные нового отзыва для обработки в состоянии
      // Обрабатываем ответ от бэкенда
      if (Array.isArray(response.data) && response.data.length > 0) {
        return response.data[0]; // Возвращаем только объект отзыва
      } else {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || 'Ошибка создания отзыва');
    }
  }
);

// Удаление отзыва
export const deleteFeedback = createAsyncThunk(
  'feedback/delete',
  async (feedbackId, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      if (!auth.user || !auth.user.email) {
        return rejectWithValue('Необходима авторизация');
      }
      
      const credentials = {
        email: auth.user.email,
        password: auth.user.password || ""
      };
      
      await axios.delete(`${API_URL}/feedback/delete/${feedbackId}`, {
        data: credentials
      });
      
      return feedbackId;
    } catch (error) {
      let errorMessage = 'Ошибка удаления отзыва';
      
      if (error.response) {
        if (error.response.status === 403) {
          errorMessage = 'У вас нет прав для удаления этого отзыва';
        } else if (error.response.data?.detail) {
          errorMessage = error.response.data.detail;
        }
      }
      
      return rejectWithValue(errorMessage);
    }
  }
);

// Начальное состояние
const initialState = {
  feedbacks: [],
  loading: false,
  error: null,
  success: false
};

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    clearStatus: (state) => {
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Обработка получения отзывов
      .addCase(fetchFeedbacks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeedbacks.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacks = action.payload;
      })
      .addCase(fetchFeedbacks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Обработка создания отзыва
      .addCase(createFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // Не добавляем отзыв в список, так как мы будем обновлять весь список
      })
      .addCase(createFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Обработка удаления отзыва
      .addCase(deleteFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacks = state.feedbacks.filter(feedback => feedback.id !== action.payload);
      })
      .addCase(deleteFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearStatus } = feedbackSlice.actions;
export default feedbackSlice.reducer;