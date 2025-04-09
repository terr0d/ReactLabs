import { Box, Typography, Paper, Divider } from "@mui/material";

function FeedbackList({ feedbacks }) {
  // Фильтруем заблокированные отзывы
  const visibleFeedbacks = feedbacks.filter(feedback => !feedback.is_blocked);

  if (!visibleFeedbacks || visibleFeedbacks.length === 0) {
    return (
      <Paper elevation={1} sx={{ p: 3, mt: 3, textAlign: 'center' }}>
        <Typography variant="body1">Пока нет отзывов</Typography>
      </Paper>
    );
  }

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