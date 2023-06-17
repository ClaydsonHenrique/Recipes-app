import SUBMIT_EMAIL from '../actions/actionTypes';

const INITIAL_STATE = {
  email: '',
};

const emailSubmitReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUBMIT_EMAIL:
    return { ...state, email: action.payload };
  default:
    return state;
  }
};

export default emailSubmitReducer;
