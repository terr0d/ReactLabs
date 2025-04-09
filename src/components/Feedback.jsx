import { useEffect } from "react";
import { Box, Typography, Container, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { feedbackApi } from "../store/feedbackApi"
import FeedbackForm from "./FeedbackForm";
import FeedbackList from "./FeedbackList";

function Feedback() {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(state => state.feedback);

  // Обновляем список отзывов после успешного создания нового
  useEffect(() => {
    if (success) {
      // Инвалидируем кэш rtk-query для обновления списка отзывов
      dispatch(feedbackApi.util.invalidateTags(['Feedback']));
    }
  }, [success, dispatch]);

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Обратная связь
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {typeof error === 'string' ? error : 'Ошибка при загрузке отзывов'}
          </Alert>
        )}
        
        <FeedbackForm />
        <FeedbackList />
      </Box>
    </Container>
  );
}

export default Feedback;