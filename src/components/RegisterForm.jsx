import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, TextField, Button, Typography, Paper, CircularProgress, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/authSlice";

const schema = yup.object({
  username: yup.string().required("Имя обязательно"),
  email: yup.string().email("Некорректный email").required("Email обязателен"),
  password: yup.string().required("Пароль обязателен").min(6, "Пароль должен содержать минимум 6 символов"),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Пароли должны совпадать')
    .required("Подтверждение пароля обязательно")
});

function RegisterForm({ onSwitchToLogin }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  const processSubmit = useCallback(async (data) => {
    const { confirmPassword, ...registerData } = data;
    
    await dispatch(registerUser(registerData));
  }, [dispatch]);

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Регистрация
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {typeof error === 'object' ? error.detail : (typeof error === 'string' ? error : 'Ошибка регистрации')}
        </Alert>
      )}
      
      <Box component="form" onSubmit={handleSubmit(processSubmit)} noValidate>
        <TextField
          margin="normal"
          fullWidth
          label="Имя пользователя"
          {...register("username")}
          error={!!errors.username}
          helperText={errors.username?.message}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Пароль"
          type="password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Подтвердите пароль"
          type="password"
          {...register("confirmPassword")}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Зарегистрироваться'}
        </Button>
        <Button
          fullWidth
          variant="text"
          onClick={onSwitchToLogin}
          disabled={loading}
        >
          Уже есть аккаунт? Войти
        </Button>
      </Box>
    </Paper>
  );
}

export default RegisterForm;