import * as types from '../types';
import { postNewComment } from '../api';

export const setTextForCommentCreate = (name, value) => ({
  type: types.COMMENT_CREATE_SET_TEXT,
  payload: { name, value }
});

export const resetCommentCreate = () => ({
  type: types.COMMENT_CREATE_RESET
});

export const commentCreate = values => async dispatch => {
  dispatch({ type: types.COMMENT_CREATE_SUBMITTING });
  try {
    const res = await postNewComment(values);
    const comment = await res.json();
    dispatch({ type: types.COMMENT_CREATE_SUCCESS, payload: comment });
  } catch (e) {
    dispatch({ type: types.COMMENT_CREATE_ERROR, payload: e.message });
  }
};
