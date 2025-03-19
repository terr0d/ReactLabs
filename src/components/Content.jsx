import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useParams } from 'react-router-dom';
import labsData from '../data/labs.json'; // Импортируем данные о лабораторных работах

function TaskList({ tasks, level = 0 }) {
  return (
    <List sx={{ pl: level * 2 }}>
      {tasks.map((task) => (
        <ListItem key={task.id} sx={{ display: 'block', py: 0 }}>
          <ListItemText primary={`${task.id}. ${task.title}`} />
          {task.subtasks && <TaskList tasks={task.subtasks} level={level + 1} />}
        </ListItem>
      ))}
    </List>
  );
}

function Content() {
  const { id } = useParams(); // Получаем параметр id из URL

  // Если id не указан, показываем сообщение
  if (!id) {
    return (
      <Paper sx={{ flex: 1, padding: 2 }}>
        <Typography>Выберите лабораторную работу</Typography>
      </Paper>
    );
  }

  // Ищем лабораторную по id
  const selectedLab = labsData.labs.find((lab) => lab.id.toString() === id);

  // Если лабораторная не найдена, показываем сообщение об ошибке
  if (!selectedLab) {
    return (
      <Paper sx={{ flex: 1, padding: 2 }}>
        <Typography>Лабораторная работа не найдена</Typography>
      </Paper>
    );
  }

  // Если лабораторная работа найдена, отображаем её содержимое
  return (
    <Paper sx={{ flex: 1, padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        {selectedLab.title}
      </Typography>
      <TaskList tasks={selectedLab.tasks} />
    </Paper>
  );
}

export default Content;