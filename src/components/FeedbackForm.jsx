import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, TextField, Button, Typography, Paper, Rating } from "@mui/material";

const schema = yup.object({
  name: yup.string().required("Имя обязательно"),
  email: yup.string().email("Некорректный email").required("Email обязателен"),
  message: yup.string().required("Сообщение обязательно").min(10, "Сообщение должно содержать минимум 10 символов"),
  rating: yup.number().min(1, "Оценка обязательна").max(5)
});

function FeedbackForm({ onSubmit }) {
  const [rating, setRating] = useState(0);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      rating: 0
    }
  });

  const processSubmit = useCallback((data) => {
    onSubmit({...data, date: new Date().toISOString()});
    reset();
    setRating(0);
  }, [onSubmit, reset]);

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Оставить отзыв
      </Typography>
      <Box component="form" onSubmit={handleSubmit(processSubmit)} noValidate>
        <TextField
          margin="normal"
          fullWidth
          label="Имя"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
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
          label="Сообщение"
          multiline
          rows={4}
          {...register("message")}
          error={!!errors.message}
          helperText={errors.message?.message}
        />
        <Box sx={{ mt: 2 }}>
          <Typography component="legend">Оценка</Typography>
          <Rating
            name="rating"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
              register("rating").onChange({target: {value: newValue, name: "rating"}});
            }}
          />
          {errors.rating && (
            <Typography color="error" variant="caption">
              {errors.rating.message}
            </Typography>
          )}
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Отправить
        </Button>
      </Box>
    </Paper>
  );
}

export default FeedbackForm;