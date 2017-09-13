import * as types from '../types';

const initialState = {
  loading: true,
  error: '',
  posts: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        posts: action.payload
      };
    case types.FETCH_POSTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        posts: []
      };
    case types.RESET_POSTS:
      return initialState;
    default:
      return state;
  }
};
