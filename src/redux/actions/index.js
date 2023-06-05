import SUBMIT_EMAIL from './actionTypes';

const submitEmail = (email) => ({
  type: SUBMIT_EMAIL,
  payload: email,
});

export default submitEmail;
