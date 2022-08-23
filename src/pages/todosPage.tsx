import Box from '@mui/material/Box';
import { useEffect, useState, memo } from 'react';
import MyBackdrop from '../components/MyBackdrop';
import MyModal from '../components/MyModal';
import CustomizedSnackbars, { SnackbarInfoType } from '../components/MySnackbar';
import MySpeedDial from '../components/MySpeedDial';
import TodosList from '../components/TodosList';
import { useTypedDispatch, useTypedSelector } from '../hooks/redux';
import { getTodosThunk } from '../redux/todos-reducer';

const TodosPage = memo(() => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [idEditing, setIdEditing] = useState<number | null>(null);
  const [snackbarInfo, setSnackbarInfo] = useState<SnackbarInfoType[]>([]);

  const doneTodos = useTypedSelector((state) => state.todos.doneTodos);
  const undoneTodos = useTypedSelector((state) => state.todos.undoneTodos);
  const isLoading = useTypedSelector((state) => state.todos.isFetching);

  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(getTodosThunk());
  }, []);

  useEffect(() => {
    if (!isModalVisible && !!idEditing) {
      setIdEditing(null);
    }
  }, [isModalVisible]);

  return (
    <Box>
      <MyBackdrop isLoading={isLoading} />
      <CustomizedSnackbars snackbarInfo={snackbarInfo} setSnackbarInfo={setSnackbarInfo} />
      <MyModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        idEditing={idEditing}
        setSnackbarInfo={setSnackbarInfo}
      />
      <TodosList
        todos={undoneTodos}
        title="Undone tasks"
        setIdEditing={setIdEditing}
        setIsModalVisible={setIsModalVisible}
        setSnackbarInfo={setSnackbarInfo}
      />
      <TodosList
        todos={doneTodos}
        title="Done tasks"
        setIdEditing={setIdEditing}
        setIsModalVisible={setIsModalVisible}
        setSnackbarInfo={setSnackbarInfo}
      />
      <MySpeedDial setIsModalVisible={setIsModalVisible} />
    </Box>
  );
});

export default TodosPage;

export type IsNewOrEditType = 'new' | 'edit' | null;
