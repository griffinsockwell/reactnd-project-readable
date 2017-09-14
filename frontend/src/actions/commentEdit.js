import * as types from '../types';
import { putEditComment } from '../api';

export const setCommentToEdit = commentId => ({
  type: types.COMMENT_EDIT_ID,
  payload: commentId
});

export const resetCommentToEdit = () => ({ type: types.COMMENT_EDIT_RESET });

export const setTextForCommentEdit = (name, value) => ({
  type: types.COMMENT_EDIT_SET_TEXT,
  payload: { name, value }
});

export const commentEdit = (values, commentId) => async dispatch => {
  dispatch({ type: types.COMMENT_EDIT_SUBMITTING });
  try {
    const res = await putEditComment(values, commentId);
    const comment = await res.json();
    dispatch({ type: types.COMMENT_EDIT_SUCCESS, payload: comment });
  } catch (e) {
    dispatch({ type: types.COMMENT_EDIT_ERROR, payload: e.message });
  }
};
