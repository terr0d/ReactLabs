import { useState, useCallback } from "react";
import { Box, Typography, Container } from "@mui/material";
import FeedbackForm from "./FeedbackForm";
import FeedbackList from "./FeedbackList";

function Feedback() {
  const [feedbacks, setFeedbacks] = useState(() => {
    // Получаем отзывы из localStorage при инициализации
    const savedFeedbacks = localStorage.getItem('feedbacks');
    return savedFeedbacks ? JSON.parse(savedFeedbacks) : [];
  });

  const handleSubmitFeedback = useCallback((newFeedback) => {
    setFeedbacks(prevFeedbacks => {
      const updatedFeedbacks = [newFeedback, ...prevFeedbacks];
      // Сохраняем отзывы в localStorage
      localStorage.setItem('feedbacks', JSON.stringify(updatedFeedbacks));
      return updatedFeedbacks;
    });
  }, []);

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Обратная связь
        </Typography>
        <FeedbackForm onSubmit={handleSubmitFeedback} />
        <FeedbackList feedbacks={feedbacks} />
      </Box>
    </Container>
  );
}

export default Feedback;