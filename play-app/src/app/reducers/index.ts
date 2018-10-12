import { combineReducers } from 'redux';
import { RootState } from './state';
import { routerReducer, RouterState } from 'react-router-redux';

export { RootState, RouterState };

export const rootReducer = combineReducers<RootState>({
  router: routerReducer as any
});
