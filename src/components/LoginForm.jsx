import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, TextField, Button, Typography, Paper, Checkbox, FormControlLabel, Alert, Snackbar } from "@mui/material";
import { useState } from "react";

const schema = yup.object({
  email: yup.string().email("Некорректный email").required("Email обязателен"),
  password: yup.string().required("Пароль обязателен").min(6, "Пароль должен содержать минимум 6 символов"),
});

function LoginForm({ onSubmit, onSwitchToRegister }) {
  const [rememberMe, setRememberMe] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  // Загрузка сохраненных данных при инициализации
  useEffect(() => {
    const savedCredentials = localStorage.getItem('userCredentials');
    if (savedCredentials) {
      const { email, password, remember } = JSON.parse(savedCredentials);
      setValue('email', email);
      setValue('password', password);
      setRememberMe(remember);
    }
  }, [setValue]);

  // Функция очистки формы
  const handleClearForm = useCallback(() => {
    reset();
    setRememberMe(false);
    localStorage.removeItem('userCredentials');
  }, [reset]);

  // Обработка отправки формы
  const processSubmit = useCallback((data) => {
    // Сохранение данных в localStorage, если включен rememberMe
    if (rememberMe) {
      localStorage.setItem('userCredentials', JSON.stringify({
        email: data.email,
        password: data.password,
        remember: true
      }));
    } else {
      localStorage.removeItem('userCredentials');
    }

    if (data.email === "admin@example.com" && data.password === "admin123") {
      setShowSuccessAlert(true);
      // Вызываем onSubmit только при успешной авторизации
      onSubmit(data);
    } else {
      setShowErrorAlert(true);
    }
  }, [onSubmit, rememberMe]);

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Вход в систему
      </Typography>
      <Box component="form" onSubmit={handleSubmit(processSubmit)} noValidate>
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
        <FormControlLabel
          control={
            <Checkbox 
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
          }
          label="Запомнить меня"
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, mb: 2 }}>
          <Button
            variant="outlined"
            onClick={handleClearForm}
          >
            Очистить
          </Button>
          <Button
            type="submit"
            variant="contained"
          >
            Войти
          </Button>
        </Box>
        <Button
          fullWidth
          variant="text"
          onClick={onSwitchToRegister}
        >
          Нет аккаунта? Зарегистрироваться
        </Button>
      </Box>

      {/* Уведомления */}
      <Snackbar 
        open={showSuccessAlert} 
        autoHideDuration={3000} 
        onClose={() => setShowSuccessAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success">Авторизация успешна!</Alert>
      </Snackbar>

      <Snackbar 
        open={showErrorAlert} 
        autoHideDuration={3000} 
        onClose={() => setShowErrorAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error">Неверный email или пароль</Alert>
      </Snackbar>
    </Paper>
  );
}

export default LoginForm;