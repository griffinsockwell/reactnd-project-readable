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
    default:
      return state;
  }
};
