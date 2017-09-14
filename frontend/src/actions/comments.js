import * as types from '../types';
import { getCommentsForPost } from '../api';

export const fetchComments = id => async dispatch => {
  try {
    const res = await getCommentsForPost(id);
    const comments = await res.json();
    dispatch({ type: types.FETCH_COMMENTS_SUCCESS, payload: comments });
  } catch (e) {
    dispatch({ type: types.FETCH_COMMENTS_ERROR, payload: e.message });
  }
};

export const resetComments = () => ({ type: types.RESET_COMMENTS });
