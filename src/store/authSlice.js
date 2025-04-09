import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

// Асинхронное действие для авторизации
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/users/auth`, credentials);
      
      // Создаем объект пользователя с данными из запроса
      const userData = {
        email: credentials.email,
        password: credentials.password, // Сохраняем пароль для авторизации запросов
        role: response.data.user_role,
        // Остальные поля будут заполнены при получении профиля
      };
      
      // Сохраняем данные пользователя в localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || 'Ошибка авторизации');
    }
  }
);

// Асинхронное действие для регистрации
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(`${API_URL}/users/reg`, userData);
      
      // Проверяем статус ответа
      if (response.status === 201 || response.status === 200) {
        // После успешной регистрации выполняем автоматический вход
        return dispatch(loginUser({
          email: userData.email,
          password: userData.password
        }));
      }
      
      return rejectWithValue('Ошибка регистрации');
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || 'Ошибка регистрации');
    }
  }
);

// Получение полного профиля пользователя
export const fetchUserProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { user } = getState().auth;
      if (!user || !user.email) return rejectWithValue('Not authenticated');
      
      const response = await axios.get(`${API_URL}/users/profile/${user.email}`);
      
      // Обновляем данные пользователя с полученными данными профиля
      const updatedUserData = {
        ...user,
        ...response.data
      };
      
      // Обновляем localStorage
      localStorage.setItem('user', JSON.stringify(updatedUserData));
      
      return updatedUserData;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || 'Ошибка получения профиля');
    }
  }
);

// Асинхронное действие для выхода
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async () => {
    localStorage.removeItem('user');
    return null;
  }
);

// Начальное состояние
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isLoggedIn: !!localStorage.getItem('user'),
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Обработка логина
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Обработка регистрации
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Обработка выхода
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isLoggedIn = false;
      })
      // Обработка получения профиля
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Синхронизация с обновлениями профиля
      .addCase('profile/update/fulfilled', (state, action) => {
        state.user = { ...state.user, ...action.payload };
      });
  }
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;