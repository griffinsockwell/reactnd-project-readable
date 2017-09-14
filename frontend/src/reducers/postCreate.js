import * as types from '../types';

const initialState = {
  submitting: false,
  error: '',
  author: '',
  title: '',
  body: '',
  category: 'none',
  postId: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.POST_CREATE_SUBMITTING:
      return { ...state, submitting: true };
    case types.POST_CREATE_SUCCESS:
      return { ...state, postId: action.payload };
    case types.POST_CREATE_ERROR:
      return { ...state, submitting: false, error: action.payload };
    case types.POST_CREATE_RESET:
      return initialState;
    case types.POST_CREATE_SET_TEXT:
      return { ...state, [action.payload.name]: action.payload.value };
    case types.POST_CREATE_SET_CATEGORY:
      return { ...state, category: action.payload };
    default:
      return state;
  }
};
