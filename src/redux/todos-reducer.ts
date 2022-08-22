import { Dispatch } from 'redux';
import { getTodos } from '../API/todosAPI';
import { InferActionsTypes } from './store';

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
  maxId: 0,
};

type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;

const todosReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'todos/SET_MAX_ID':
      return {
        ...state,
        maxId: action.maxId,
      };
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
    case 'todos/CHANGE_TO_COMPLETED':
      const doneItem = state.undoneTodos.find((item) => item.id === action.id) as TodoType;
      doneItem.completed = true;
      return {
        ...state,
        undoneTodos: state.undoneTodos.filter((item) => item.id !== action.id),
        doneTodos: [doneItem, ...state.doneTodos],
      };
    case 'todos/CHANGE_TO_NOT_COMPLETED':
      const undoneItem = state.doneTodos.find((item) => item.id === action.id) as TodoType;
      undoneItem.completed = false;
      return {
        ...state,
        doneTodos: state.doneTodos.filter((item) => item.id !== action.id),
        undoneTodos: [...state.undoneTodos, undoneItem],
      };
    case 'todos/REMOVE_ITEM':
      return {
        ...state,
        doneTodos: state.doneTodos.filter((item) => item.id !== action.id),
        undoneTodos: state.undoneTodos.filter((item) => item.id !== action.id),
      };
    case 'todos/EDIT_ITEM':
      return {
        ...state,
        doneTodos: state.doneTodos.map((item) => {
          if (item.id === action.id) {
            item.title = action.text;
          }
          return item;
        }),
        undoneTodos: state.undoneTodos.map((item) => {
          if (item.id === action.id) {
            item.title = action.text;
          }
          return item;
        }),
      };
    case 'todos/CREATE_ITEM':
      return {
        ...state,
        undoneTodos: [
          {
            userId: 1,
            id: state.maxId + 1,
            title: action.text,
            completed: false,
          },
          ...state.undoneTodos,
        ],
        maxId: state.maxId + 1,
      };
    default:
      return state;
  }
};

export default todosReducer;

export const actions = {
  setMaxId: (maxId: number) =>
    ({
      type: 'todos/SET_MAX_ID',
      maxId,
    } as const),
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
  changeToCompleted: (id: number) =>
    ({
      type: 'todos/CHANGE_TO_COMPLETED',
      id,
    } as const),
  changeToNotCompleted: (id: number) =>
    ({
      type: 'todos/CHANGE_TO_NOT_COMPLETED',
      id,
    } as const),
  removeItem: (id: number) =>
    ({
      type: 'todos/REMOVE_ITEM',
      id,
    } as const),
  editItem: (id: number, text: string) =>
    ({
      type: 'todos/EDIT_ITEM',
      id,
      text,
    } as const),
  createItem: (text: string) =>
    ({
      type: 'todos/CREATE_ITEM',
      text,
    } as const),
};

export type DispatchType = Dispatch<ActionsTypes>;

export const getTodosThunk = () => async (dispatch: DispatchType) => {
  dispatch(actions.setIsFetching(true));
  const todos = await getTodos();
  const lastItem = todos.at(-1);
  if (lastItem) {
    dispatch(actions.setMaxId(lastItem.id));
  }
  const undone = todos.filter((todo) => todo.completed === false);
  dispatch(actions.gotUndoneTodos(undone));
  const done = todos.filter((todo) => todo.completed === true);
  dispatch(actions.gotDoneTodos(done));
  dispatch(actions.setIsFetching(false));
};

export const changeIsCompleted =
  (id: number, isCompleted: boolean) => async (dispatch: DispatchType) => {
    if (isCompleted) {
      dispatch(actions.changeToCompleted(id));
    } else {
      dispatch(actions.changeToNotCompleted(id));
    }
  };

export const removeItem = (id: number) => async (dispatch: DispatchType) => {
  dispatch(actions.removeItem(id));
};

export const editItem = (id: number, text: string) => async (dispatch: DispatchType) => {
  dispatch(actions.editItem(id, text));
};

export const createItem = (text: string) => async (dispatch: DispatchType) => {
  dispatch(actions.createItem(text));
};
