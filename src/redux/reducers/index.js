import { combineReducers } from 'redux';
import email from './email';
import receitas from './receitas';

const rootReducer = combineReducers({
  email,
  receitas,
});

export default rootReducer;
