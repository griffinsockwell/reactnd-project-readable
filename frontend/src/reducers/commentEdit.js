import * as types from '../types';

const initialState = {
  editingCommentId: '',
  submitting: false,
  error: '',
  body: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.COMMENT_EDIT_ID:
      return { ...state, editingCommentId: action.payload };
    case types.COMMENT_EDIT_SUBMITTING:
      return { ...state, submitting: true };
    case types.COMMENT_EDIT_SUCCESS:
      return initialState;
    case types.COMMENT_EDIT_ERROR:
      return { ...state, error: action.payload };
    case types.COMMENT_EDIT_RESET:
      return initialState;
    case types.COMMENT_EDIT_SET_TEXT:
      return { ...state, [action.payload.name]: action.payload.value };
    default:
      return state;
  }
};
