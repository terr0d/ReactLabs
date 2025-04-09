import { useEffect } from "react";
import { Box, Typography, Container, CircularProgress, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeedbacks } from "../store/feedbackSlice";
import FeedbackForm from "./FeedbackForm";
import FeedbackList from "./FeedbackList";

function Feedback() {
  const dispatch = useDispatch();
  const { feedbacks, loading, error, success } = useSelector(state => state.feedback);

  // Загружаем отзывы при монтировании компонента
  useEffect(() => {
    dispatch(fetchFeedbacks());
  }, [dispatch]);

  // Обновляем список отзывов после успешного создания нового
  useEffect(() => {
    if (success) {
      dispatch(fetchFeedbacks());
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
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <FeedbackList feedbacks={feedbacks} />
        )}
      </Box>
    </Container>
  );
}

export default Feedback;