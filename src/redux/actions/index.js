import SUBMIT_EMAIL from './actionTypes';

const submitEmail = (email) => ({
  type: SUBMIT_EMAIL,
  payload: email,
});

export default submitEmail;

export const ADD_RECEITAS = 'ADD_RECEITAS';
export const addreceitas = (receitas) => ({
  type: ADD_RECEITAS,
  payload: receitas,
});
