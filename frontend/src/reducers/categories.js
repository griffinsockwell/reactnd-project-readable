import * as types from '../types';

const initialState = {
  loading: true,
  error: '',
  categories: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        categories: action.payload
      };
    case types.FETCH_CATEGORIES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
