import { Box, Typography, Paper, Divider, IconButton, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { deleteFeedback } from "../store/feedbackSlice";
import { useState } from "react";

function FeedbackList({ feedbacks }) {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { loading } = useSelector(state => state.feedback);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);

  // Открыть диалог подтверждения удаления
  const handleDeleteClick = (id) => {
    setSelectedFeedbackId(id);
    setDeleteDialogOpen(true);
  };

  // Закрыть диалог
  const handleCloseDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedFeedbackId(null);
  };

  // Подтвердить удаление
  const handleConfirmDelete = () => {
    if (selectedFeedbackId) {
      dispatch(deleteFeedback(selectedFeedbackId));
      setDeleteDialogOpen(false);
      setSelectedFeedbackId(null);
    }
  };

  // Проверка, может ли пользователь удалить отзыв
  const canDeleteFeedback = (feedback) => {
    if (!user) return false;
    
    // Админ может удалять любые отзывы
    if (user.role === 'admin') return true;
    
    // Пользователь может удалять свои отзывы
    // Проверяем, принадлежит ли отзыв текущему пользователю
    return user.id === feedback.user_id;
  };

  if (!feedbacks || feedbacks.length === 0) {
    return (
      <Paper elevation={1} sx={{ p: 3, mt: 3, textAlign: 'center' }}>
        <Typography variant="body1">Пока нет отзывов</Typography>
      </Paper>
    );
  }

  return (
    <>
      <Paper elevation={2} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Отзывы пользователей
        </Typography>
        
        {feedbacks.map((feedback, index) => (
          <Box key={feedback.id || index} sx={{ mb: 2 }}>
            {index > 0 && <Divider sx={{ my: 2 }} />}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {feedback.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                  {new Date(feedback.created_at).toLocaleDateString()}
                </Typography>
                
                {/* Показываем кнопку удаления для админа и владельца отзыва */}
                {canDeleteFeedback(feedback) && (
                  <IconButton 
                    color="error" 
                    size="small" 
                    onClick={() => handleDeleteClick(feedback.id)}
                    disabled={loading}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
            </Box>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {feedback.message}
            </Typography>
          </Box>
        ))}
      </Paper>
      
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Подтверждение удаления</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы уверены, что хотите удалить этот отзыв? Это действие невозможно отменить.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Отмена</Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default FeedbackList;