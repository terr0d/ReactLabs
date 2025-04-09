import React from "react";
import { Box, Typography, Paper, Divider, CircularProgress } from "@mui/material";
import { useGetFeedbacksQuery } from "../store/feedbackApi";

function FeedbackList() {
  const { data: feedbacks, isLoading, isFetching, isError, error } = useGetFeedbacksQuery();

  // Показываем спиннер при первоначальной загрузке или при обновлении данных
  if (isLoading || isFetching) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Показываем сообщение об ошибке, если запрос завершился с ошибкой
  if (isError) {
    return (
      <Paper elevation={1} sx={{ p: 3, mt: 3, textAlign: 'center', color: 'error.main' }}>
        <Typography variant="body1">
          Ошибка загрузки отзывов: {error.data?.detail || error.error || 'Неизвестная ошибка'}
        </Typography>
      </Paper>
    );
  }

  // Фильтруем заблокированные отзывы
  const visibleFeedbacks = feedbacks?.filter(feedback => !feedback.is_blocked) || [];

  // Показываем сообщение, если отзывов нет
  if (visibleFeedbacks.length === 0) {
    return (
      <Paper elevation={1} sx={{ p: 3, mt: 3, textAlign: 'center' }}>
        <Typography variant="body1">Пока нет отзывов</Typography>
      </Paper>
    );
  }

  // Успешный результат - отображаем список отзывов
  return (
    <Paper elevation={2} sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Отзывы пользователей
      </Typography>
      
      {visibleFeedbacks.map((feedback, index) => (
        <Box key={feedback.id || index} sx={{ mb: 2 }}>
          {index > 0 && <Divider sx={{ my: 2 }} />}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {feedback.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {new Date(feedback.created_at).toLocaleDateString()}
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {feedback.message}
          </Typography>
        </Box>
      ))}
    </Paper>
  );
}

export default FeedbackList;