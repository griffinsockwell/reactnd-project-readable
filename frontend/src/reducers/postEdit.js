import * as types from '../types';

const initialState = {
  loading: true,
  errorFetch: '',
  post: {},
  submitting: false,
  errorSubmit: '',
  title: '',
  body: '',
  postId: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.POST_EDIT_FETCH_SUCESS:
      return {
        ...state,
        loading: false,
        error: '',
        post: action.payload
      };
    case types.POST_EDIT_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        errorFetch: action.payload,
        post: {}
      };
    case types.POST_EDIT_RESET:
      return initialState;
    case types.POST_EDIT_SUBMITTING:
      return { ...state, submitting: true };
    case types.POST_EDIT_SUCCESS:
      return { ...state, postId: action.payload };
    case types.POST_EDIT_ERROR:
      return { ...state, submitting: false, errorSubmit: action.payload };
    case types.POST_EDIT_SET_TEXT:
      return { ...state, [action.payload.name]: action.payload.value };
    default:
      return state;
  }
};
