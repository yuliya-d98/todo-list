import { useEffect, useState } from 'react';
import { useTypedDispatch } from '../hooks/redux';
import { changeIsCompleted, removeItem, TodoType } from '../redux/todos-reducer';
import { v4 as uuidv4 } from 'uuid';
import { SeverityType, SnackbarInfoType } from './MySnackbar';

import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';

type TodoItemPropsType = {
  item: TodoType;
  setIdEditing: (idEditing: number | null) => void;
  setIsModalVisible: (isModalVisible: boolean) => void;
  setSnackbarInfo: React.Dispatch<React.SetStateAction<SnackbarInfoType[]>>;
};

const TodoItem = (props: TodoItemPropsType) => {
  const { item, setIdEditing, setIsModalVisible, setSnackbarInfo } = props;
  const [isDone, setIsDone] = useState(item.completed);
  const [isInputDisabled, setIsInputDisabled] = useState(false);

  const dispatch = useTypedDispatch();

  const onCheckboxClick = () => {
    if (!isInputDisabled) {
      setIsInputDisabled(true);
      setIsDone((isDone) => !isDone);
    }
  };

  const deleteItem = () => {
    try {
      dispatch(removeItem(item.id));
      setSnackbarInfo((snackbarInfo) => [
        ...snackbarInfo,
        {
          severity: 'success' as SeverityType,
          message: 'Item was successfully removed!',
          id: uuidv4(),
        },
      ]);
    } catch {
      setSnackbarInfo((snackbarInfo) => [
        ...snackbarInfo,
        {
          severity: 'error' as SeverityType,
          message: 'Oops! Some error while removing!',
          id: uuidv4(),
        },
      ]);
    }
  };

  const editItem = () => {
    setIdEditing(item.id);
    setIsModalVisible(true);
  };

  useEffect(() => {
    if (isInputDisabled) {
      dispatch(changeIsCompleted(item.id, isDone));
      setIsInputDisabled(false);
    }
  }, [isDone]);

  const styles = {
    p: {
      xs: 0,
      custom450: 1,
    },
  };

  return (
    <ListItem>
      <ListItemButton sx={styles} role={undefined} onClick={onCheckboxClick} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={isDone}
            tabIndex={-1}
            disableRipple
            disabled={isInputDisabled}
          />
        </ListItemIcon>
        <ListItemText primary={item.id} secondary={item.title} />
      </ListItemButton>
      <ListItemIcon>
        <Tooltip title="Edit" arrow>
          <IconButton aria-label="edit" onClick={editItem}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      </ListItemIcon>
      <ListItemSecondaryAction>
        <Tooltip title="Remove" arrow>
          <IconButton edge="end" aria-label="delete" onClick={deleteItem}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TodoItem;
