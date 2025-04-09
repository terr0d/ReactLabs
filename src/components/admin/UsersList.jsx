import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTable, useSortBy, useColumnOrder } from 'react-table';
import { fetchUsers, blockUser, deleteUser } from '../../store/usersSlice';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Box, Typography, Button, Paper } from '@mui/material';

// Компонент для перетаскиваемого заголовка колонки
const DraggableColumnHeader = ({ column, index, moveColumn }) => {
  const [, drop] = useDrop({
    accept: 'column',
    hover(item) {
      if (item.index !== index) {
        moveColumn(item.index, index);
        item.index = index;
      }
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'column',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  return (
    <th 
      ref={(node) => drag(drop(node))} 
      {...column.getHeaderProps(column.getSortByToggleProps())}
      style={{ 
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        padding: '10px',
        background: '#f2f2f2',
        borderBottom: '1px solid #ddd',
        textAlign: 'center',
        verticalAlign: 'middle'
      }}
    >
      {column.render('Header')}
      <span>
        {column.isSorted
          ? column.isSortedDesc
            ? ' 🔽'
            : ' 🔼'
          : ''}
      </span>
    </th>
  );
};

const UsersList = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector(state => state.users);
  
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleBlockUser = (userId) => {
    if (window.confirm('Вы уверены, что хотите заблокировать этого пользователя?')) {
      dispatch(blockUser(userId));
    }
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Вы уверены, что хотите удалить этого пользователя?')) {
      dispatch(deleteUser(userId));
    }
  };

  const columns = useMemo(() => [
    {
      Header: 'ID',
      accessor: 'id',
      id: 'id',
    },
    {
      Header: 'Имя пользователя',
      accessor: 'username',
      id: 'username',
    },
    {
      Header: 'Email',
      accessor: 'email',
      id: 'email',
    },
    {
      Header: 'Роль',
      accessor: 'role',
      id: 'role',
    },
    {
      Header: 'Имя',
      accessor: 'first_name',
      id: 'first_name',
    },
    {
      Header: 'Фамилия',
      accessor: 'last_name',
      id: 'last_name',
    },
    {
      Header: 'Статус',
      accessor: 'is_blocked',
      id: 'is_blocked',
      Cell: ({ value }) => (
        <div style={{ textAlign: 'center' }}>
          {value ? 'Заблокирован' : 'Активен'}
        </div>
      )
    },
    {
      Header: 'Действия',
      id: 'actions',
      Cell: ({ row }) => (
        <Box display="flex" justifyContent="center">
          {!row.original.is_blocked && (
            <Button 
              variant="outlined" 
              color="warning" 
              size="small" 
              sx={{ mr: 1 }}
              onClick={() => handleBlockUser(row.original.id)}
            >
              Заблокировать
            </Button>
          )}
          <Button 
            variant="outlined" 
            color="error" 
            size="small"
            onClick={() => handleDeleteUser(row.original.id)}
          >
            Удалить
          </Button>
        </Box>
      )
    }
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setColumnOrder,
    state: { columnOrder }
  } = useTable(
    {
      columns,
      data: users || [],
      initialState: {
        sortBy: [{ id: 'id', desc: false }],
        columnOrder: [
          'id',
          'username',
          'email',
          'role',
          'first_name',
          'last_name',
          'is_blocked',
          'actions',
        ]
      }
    },
    useSortBy,
    useColumnOrder
  );

  const moveColumn = (dragIndex, hoverIndex) => {
    const newColumnOrder = [...columnOrder];
    const dragItem = newColumnOrder[dragIndex];
    newColumnOrder.splice(dragIndex, 1);
    newColumnOrder.splice(hoverIndex, 0, dragItem);
    setColumnOrder(newColumnOrder);
  };

  if (loading) return <Typography>Загрузка пользователей...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
        Управление пользователями
      </Typography>
      
      <DndProvider backend={HTML5Backend}>
        <div className="table-responsive">
          <table {...getTableProps()} className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, index) => (
                    <DraggableColumnHeader 
                      key={column.id}
                      column={column} 
                      index={index} 
                      moveColumn={moveColumn}
                    />
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => (
                      <td 
                        {...cell.getCellProps()}
                        style={{ 
                          padding: '10px',
                          borderBottom: '1px solid #ddd',
                          textAlign: 'center',
                          verticalAlign: 'middle'
                        }}
                      >
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </DndProvider>
    </Paper>
  );
};

export default UsersList;