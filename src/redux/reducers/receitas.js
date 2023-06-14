import { ADD_RECEITAS } from '../actions';

const INITIAL_STATE = {
  receitas: [],
};
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_RECEITAS:
    return {
      receitas: action.payload,

    };
  default:
    return state;
  }
};

export default reducer;
