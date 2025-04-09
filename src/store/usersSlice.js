import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

// Получение всех пользователей
export const fetchUsers = createAsyncThunk(
  'users/fetchAll',
  async (_, { rejectWithValue, getState }) => {
    try {
      const response = await axios.get(`${API_URL}/users/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || 'Ошибка получения пользователей');
    }
  }
);

// Блокировка пользователя
export const blockUser = createAsyncThunk(
  'users/block',
  async (userId, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      if (!auth.user || !auth.user.email) {
        return rejectWithValue('Необходима авторизация');
      }
      
      const credentials = {
        email: auth.user.email,
        password: auth.user.password || ""
      };
      
      await axios.put(`${API_URL}/users/block/${userId}`, credentials);
      
      return userId;
    } catch (error) {
      let errorMessage = 'Ошибка блокировки пользователя';
      
      if (error.response) {
        if (error.response.status === 403) {
          errorMessage = 'У вас нет прав для блокировки пользователя';
        } else if (error.response.data?.detail) {
          errorMessage = error.response.data.detail;
        }
      }
      
      return rejectWithValue(errorMessage);
    }
  }
);

// Удаление пользователя
export const deleteUser = createAsyncThunk(
  'users/delete',
  async (userId, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      if (!auth.user || !auth.user.email) {
        return rejectWithValue('Необходима авторизация');
      }
      
      const credentials = {
        email: auth.user.email,
        password: auth.user.password || ""
      };
      
      await axios.delete(`${API_URL}/users/delete/${userId}`, {
        data: credentials
      });
      
      return userId;
    } catch (error) {
      let errorMessage = 'Ошибка удаления пользователя';
      
      if (error.response) {
        if (error.response.status === 403) {
          errorMessage = 'У вас нет прав для удаления пользователя';
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
  users: [],
  loading: false,
  error: null,
  success: false
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearStatus: (state) => {
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Получение пользователей
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Блокировка пользователя
      .addCase(blockUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(blockUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map(user => 
          user.id === action.payload 
            ? { ...user, is_blocked: true } 
            : user
        );
        state.success = true;
      })
      .addCase(blockUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Удаление пользователя
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(user => user.id !== action.payload);
        state.success = true;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
});

export const { clearStatus } = usersSlice.actions;
export default usersSlice.reducer;