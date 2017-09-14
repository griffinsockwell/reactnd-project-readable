import * as types from '../types';

const initialState = {
  loading: true,
  error: '',
  comments: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        comments: action.payload
      };
    case types.FETCH_COMMENTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        comments: []
      };
    case types.RESET_COMMENTS:
      return initialState;
    case types.COMMENT_CREATE_SUCCESS:
      return { ...state, comments: [...state.comments, action.payload] };
    case types.COMMENT_EDIT_SUCCESS:
      const comment = action.payload;
      const filteredComments = state.comments.filter(c => c.id !== comment.id);
      return { ...state, comments: [...filteredComments, comment] };
    default:
      return state;
  }
};
