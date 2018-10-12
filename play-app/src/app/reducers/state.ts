import { RouterState } from 'react-router-redux';
import { User } from 'app/models/TodoModel';

export interface RootState {
  router: RouterState;
}

export type TodoState = User[];
