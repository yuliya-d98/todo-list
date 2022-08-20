import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { useTypedDispatch, useTypedSelector } from '../hooks/redux';
import { changeIsCompleted, getTodosThunk, TodoType } from '../redux/todos-reducer';

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';

import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import DoneAllIcon from '@mui/icons-material/DoneAll';

import Checkbox from '@mui/material/Checkbox';

type TodoItemPropsType = {
  item: TodoType;
};

const TodoItem = ({ item }: TodoItemPropsType) => {
  const [isDone, setIsDone] = useState(item.completed);

  const dispatch = useTypedDispatch();

  const onCheckboxClick = () => {
    setIsDone((isDone) => !isDone);
    dispatch(changeIsCompleted(item.id, isDone));
  };

  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      }
    >
      {/* <ListItemAvatar>
        <Avatar>
          <FolderIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={item.id} secondary={item.title} /> */}
      <ListItemButton role={undefined} onClick={onCheckboxClick} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={isDone}
            tabIndex={-1}
            disableRipple
            // inputProps={{ 'aria-labelledby': labelId }}
          />
        </ListItemIcon>
        <ListItemText primary={item.id} secondary={item.title} />
      </ListItemButton>
    </ListItem>
  );
};

type TodosListProps = {
  todos: TodoType[];
  title: 'Undone tasks' | 'Done tasks';
};
const TodosList = ({ todos, title }: TodosListProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleIsOpen = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <>
      <ListItemButton onClick={toggleIsOpen}>
        <ListItemIcon>
          {title === 'Undone tasks' ? <AutoAwesomeMotionIcon /> : <DoneAllIcon />}
        </ListItemIcon>
        <ListItemText primary={title} />
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {todos.map((item) => (
            <TodoItem item={item} key={item.id} />
          ))}
        </List>
      </Collapse>
    </>
  );
};

const TodosPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const doneTodos = useTypedSelector((state) => state.todos.doneTodos);
  const undoneTodos = useTypedSelector((state) => state.todos.undoneTodos);
  const isLoading = useTypedSelector((state) => state.todos.isFetching);

  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(getTodosThunk());
  }, []);

  return (
    <Box>
      {isLoading && <p>Loading...</p>}
      {undoneTodos.length && <TodosList todos={undoneTodos} title="Undone tasks" />}
      {doneTodos.length && <TodosList todos={doneTodos} title="Done tasks" />}
    </Box>
  );
};

export default TodosPage;
