import { useState, memo } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { SnackbarInfoType } from './MySnackbar';
import { v4 as uuidv4 } from 'uuid';
import { useTypedDispatch } from '../hooks/redux';
import { editItem, createItem } from '../redux/todos-reducer';

type MyModalProps = {
  isModalVisible: boolean;
  idEditing: number | null;
  setIsModalVisible: (isModalVisible: boolean) => void;
  setSnackbarInfo: React.Dispatch<React.SetStateAction<SnackbarInfoType[]>>;
};

const MyModal = memo((props: MyModalProps) => {
  const { isModalVisible, idEditing, setIsModalVisible, setSnackbarInfo } = props;
  const [inputText, setInputText] = useState('');

  const dispatch = useTypedDispatch();

  const handleClose = () => {
    setInputText('');
    setIsModalVisible(false);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    setInputText(value);
  };

  const error = inputText.length < 5 || inputText.length > 300;
  const helperText = error ? 'Your task should contain from 5 to 300 symbols' : ' ';

  const saveTask = () => {
    if (idEditing) {
      editTask();
    } else {
      createTask();
    }
    handleClose();
  };

  const editTask = () => {
    if (idEditing) {
      try {
        dispatch(editItem(idEditing, inputText));
        setSnackbarInfo((info) => [
          ...info,
          {
            severity: 'success',
            message: 'Task successfully edited!',
            id: uuidv4(),
          },
        ]);
      } catch {
        setSnackbarInfo((info) => [
          ...info,
          {
            severity: 'error',
            message: 'Oops! Some error while editing! Please try again.',
            id: uuidv4(),
          },
        ]);
      }
    }
  };

  const createTask = () => {
    try {
      dispatch(createItem(inputText));
      setSnackbarInfo((info) => [
        ...info,
        {
          severity: 'success',
          message: 'Task successfully created!',
          id: uuidv4(),
        },
      ]);
    } catch {
      setSnackbarInfo((info) => [
        ...info,
        {
          severity: 'error',
          message: 'Oops! Some error while creating! Please try again.',
          id: uuidv4(),
        },
      ]);
    }
  };

  return (
    <Modal
      open={isModalVisible}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box component="form" sx={style} noValidate autoComplete="off">
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
          {idEditing ? 'Edit task' : 'Create new task'}
        </Typography>
        <TextField
          value={inputText}
          onChange={onInputChange}
          id="outlined-textarea"
          label="Write your task"
          placeholder="Placeholder"
          multiline
          fullWidth
          sx={{ mt: 1, mb: 3 }}
          helperText={helperText}
          maxRows={8}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <Button variant="text" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={saveTask} disabled={error}>
            {idEditing ? 'Edit' : 'Create'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
});

export default MyModal;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: 250,
    custom450: 400,
  },
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: {
    xs: 2,
    custom450: 4,
  },
};
