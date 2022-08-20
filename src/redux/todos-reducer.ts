import { Dispatch } from 'redux';
import { getTodos } from '../API/todosAPI';
import { InferActionsTypes } from './store';
// import { chatAPI, ChatMessageAPIType, StatusType } from '../api/chat-api';
// import { BaseThunkType, InferActionsTypes } from './redux-store';
// import { v1 } from 'uuid';

export type TodoType = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const initialState = {
  undoneTodos: [] as TodoType[],
  doneTodos: [] as TodoType[],
  isFetching: false,
};

type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;

const todosReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'todos/SET_UNDONE_TODOS':
      return {
        ...state,
        undoneTodos: action.undone,
      };
    case 'todos/SET_DONE_TODOS':
      return {
        ...state,
        doneTodos: action.done,
      };
    case 'todos/TOGGLE_IS_FETCHING':
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case 'todos/CHANGE_IS_COMPLETED':
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default todosReducer;

export const actions = {
  gotUndoneTodos: (undone: TodoType[]) =>
    ({
      type: 'todos/SET_UNDONE_TODOS',
      undone,
    } as const),
  gotDoneTodos: (done: TodoType[]) =>
    ({
      type: 'todos/SET_DONE_TODOS',
      done,
    } as const),
  setIsFetching: (isFetching: boolean) =>
    ({
      type: 'todos/TOGGLE_IS_FETCHING',
      isFetching,
    } as const),
  changeIsCompleted: (id: number, isCompleted: boolean) =>
    ({
      type: 'todos/CHANGE_IS_COMPLETED',
      id,
      isCompleted,
    } as const),
};

export type DispatchType = Dispatch<ActionsTypes>;

export const getTodosThunk = () => async (dispatch: DispatchType) => {
  dispatch(actions.setIsFetching(true));
  const todos = await getTodos();
  const undone = todos.filter((todo) => todo.completed === false);
  dispatch(actions.gotUndoneTodos(undone));
  const done = todos.filter((todo) => todo.completed === true);
  dispatch(actions.gotDoneTodos(done));
  dispatch(actions.setIsFetching(false));
};

export const changeIsCompleted =
  (id: number, isCompleted: boolean) => async (dispatch: DispatchType) => {
    // dispatch(actions.changeIsCompleted(id, isCompleted));
    console.log('id, isCompleted ', id, isCompleted);
  };
