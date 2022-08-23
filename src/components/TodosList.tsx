import React, { useState, memo } from 'react';
import { TodoType } from '../redux/todos-reducer';
import TodoItem from './TodoItem';

import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Badge from '@mui/material/Badge';
import { SnackbarInfoType } from './MySnackbar';

type TodosListProps = {
  todos: TodoType[];
  title: 'Undone tasks' | 'Done tasks';
  setIdEditing: (idEditing: number | null) => void;
  setIsModalVisible: (isModalVisible: boolean) => void;
  setSnackbarInfo: React.Dispatch<React.SetStateAction<SnackbarInfoType[]>>;
};

const TodosList = memo((props: TodosListProps) => {
  const { todos, title, setIdEditing, setIsModalVisible, setSnackbarInfo } = props;
  const [isOpen, setIsOpen] = useState(true);

  const toggleIsOpen = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <List component="div">
      <ListItemButton onClick={toggleIsOpen}>
        <ListItemIcon>
          <Badge badgeContent={todos.length} color="primary">
            {title === 'Undone tasks' ? <AutoAwesomeMotionIcon /> : <DoneAllIcon />}
          </Badge>
        </ListItemIcon>
        <ListItemText primary={title} />
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {todos.length ? (
            todos.map((item) => (
              <TodoItem
                item={item}
                key={item.id}
                setIdEditing={setIdEditing}
                setIsModalVisible={setIsModalVisible}
                setSnackbarInfo={setSnackbarInfo}
              />
            ))
          ) : (
            <ListItemText secondary="No tasks found" sx={{ p: 1 }} />
          )}
        </List>
      </Collapse>
    </List>
  );
});

export default TodosList;
