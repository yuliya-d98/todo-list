import axios from 'axios';
import { TodoType } from '../redux/todos-reducer';

export const getTodos = async () => {
  const resp = await axios.get<TodoType[]>(`https://jsonplaceholder.typicode.com/todos?userId=1`);
  return resp.data;
};
