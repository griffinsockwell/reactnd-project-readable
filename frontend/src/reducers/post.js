import * as types from '../types';

const initialState = {
  loading: true,
  error: '',
  post: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        post: action.payload
      };
    case types.FETCH_POST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        post: {}
      };
    case types.RESET_POST:
      return initialState;
    case types.POSTS_DELETE:
      const postToDelete = action.payload;
      return { ...state, post: { ...postToDelete, deleted: true } };
    case types.POSTS_VOTE:
      const postToVote = action.payload;
      return { ...state, post: postToVote };
    default:
      return state;
  }
};
