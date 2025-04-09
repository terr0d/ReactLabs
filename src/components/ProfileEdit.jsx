import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, TextField, Button, Typography, Paper, CircularProgress, Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, clearStatus } from "../store/profileSlice";

const schema = yup.object({
  username: yup.string().nullable(),
  email: yup.string().email("Некорректный email").nullable(),
  password: yup.string().nullable().transform(value => value === "" ? null : value),
  first_name: yup.string().nullable(),
  last_name: yup.string().nullable()
});

function ProfileEdit() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { loading, error, success } = useSelector(state => state.profile);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
      password: "",
      first_name: user?.first_name || "",
      last_name: user?.last_name || ""
    }
  });

  // Обновляем форму при изменении пользователя
  useEffect(() => {
    if (user) {
      reset({
        username: user.username || "",
        email: user.email || "",
        password: "",
        first_name: user.first_name || "",
        last_name: user.last_name || ""
      });
    }
  }, [user, reset]);

  const processSubmit = async (data) => {
    // Фильтруем пустые поля
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== null && value !== "")
    );
    
    if (Object.keys(filteredData).length === 0) return;
    
    await dispatch(updateProfile({ 
      userId: user.id, 
      profileData: filteredData 
    }));
  };

  const handleCloseSnackbar = () => {
    dispatch(clearStatus());
  };

  if (!user) {
    return (
      <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: "auto", mt: 4 }}>
        <Typography variant="body1" align="center">
          Необходимо авторизоваться для редактирования профиля
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom align="center">
        Редактирование профиля
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {typeof error === 'string' ? error : 'Ошибка обновления профиля'}
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
          label="Новый пароль (оставьте пустым, чтобы не менять)"
          type="password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Имя"
          {...register("first_name")}
          error={!!errors.first_name}
          helperText={errors.first_name?.message}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Фамилия"
          {...register("last_name")}
          error={!!errors.last_name}
          helperText={errors.last_name?.message}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Сохранить изменения'}
        </Button>
      </Box>
      
      <Snackbar 
        open={success} 
        autoHideDuration={3000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success">Профиль успешно обновлен!</Alert>
      </Snackbar>
    </Paper>
  );
}

export default ProfileEdit;