import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, TextField, Button, Typography, Paper, CircularProgress, Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createFeedback, clearStatus } from "../store/feedbackSlice";

const schema = yup.object({
  message: yup.string().required("Сообщение обязательно").min(10, "Сообщение должно содержать минимум 10 символов")
});

function FeedbackForm() {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(state => state.feedback);
  const { user } = useSelector(state => state.auth);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      message: ""
    }
  });

  const processSubmit = useCallback(async (data) => {
    // Берем данные пользователя из профиля
    const feedbackData = {
      name: user?.username || "",
      email: user?.email || "",
      message: data.message,
      user_id: user?.id
    };
    
    await dispatch(createFeedback(feedbackData));
    
    // Сбрасываем форму только при успешном создании отзыва
    if (!error) {
      reset();
    }
  }, [dispatch, user, reset, error]);

  const handleCloseSnackbar = () => {
    dispatch(clearStatus());
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Оставить отзыв
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {typeof error === 'string' ? error : 'Ошибка при отправке отзыва'}
        </Alert>
      )}
      
      <Box component="form" onSubmit={handleSubmit(processSubmit)} noValidate>
        <TextField
          margin="normal"
          fullWidth
          label="Сообщение"
          multiline
          rows={4}
          {...register("message")}
          error={!!errors.message}
          helperText={errors.message?.message}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Отправить'}
        </Button>
      </Box>
      
      <Snackbar 
        open={success} 
        autoHideDuration={3000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success">Отзыв успешно отправлен!</Alert>
      </Snackbar>
    </Paper>
  );
}

export default FeedbackForm;