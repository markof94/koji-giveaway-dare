import { createStore } from 'redux';
import { buildReducer } from '../reducer';

const configureStore = () => createStore(
  buildReducer(),
);

export default configureStore;
