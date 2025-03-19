import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

function TaskList({ tasks, level = 0 }) {
  return (
    <List sx={{ pl: level}}>
      {tasks.map((task) => (
        <ListItem key={task.id} sx={{ display: 'block', py: 0 }}>
          <ListItemText 
            primary={`${task.id}. ${task.title}`}
            primaryTypographyProps={{ 
              style: { 
                whiteSpace: 'pre-line', 
                wordBreak: 'break-word' 
              } 
            }}
          />
          {task.subtasks && <TaskList tasks={task.subtasks} level={level + 1} />}
        </ListItem>
      ))}
    </List>
  );
}

function Content({ selectedLab }) {
  if (!selectedLab) {
    return (
      <Paper sx={{ flex: 1, padding: 2 }}>
        <Typography>Выберите лабораторную работу</Typography>
      </Paper>
    );
  }

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