import * as types from '../types';

const initialState = {
  submitting: false,
  error: '',
  body: '',
  author: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.COMMENT_CREATE_SUBMITTING:
      return { ...state, submitting: true };
    case types.COMMENT_CREATE_SUCCESS:
      return initialState;
    case types.COMMENT_CREATE_ERROR:
      return { ...state, submitting: false, error: action.payload };
    case types.COMMENT_CREATE_RESET:
      return initialState;
    case types.COMMENT_CREATE_SET_TEXT:
      return { ...state, [action.payload.name]: action.payload.value };
    default:
      return state;
  }
};
