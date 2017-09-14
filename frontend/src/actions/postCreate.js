import * as types from '../types';
import { postNewPost } from '../api';

export const setTextForPostCreate = (name, value) => ({
  type: types.POST_CREATE_SET_TEXT,
  payload: { name, value }
});

export const setCategoryForPostCreate = category => ({
  type: types.POST_CREATE_SET_CATEGORY,
  payload: category
});

export const resetPostCreate = () => ({
  type: types.POST_CREATE_RESET
});

export const postCreate = values => async dispatch => {
  dispatch({ type: types.POST_CREATE_SUBMITTING });
  try {
    const res = await postNewPost(values);
    const post = await res.json();
    dispatch({ type: types.POST_CREATE_SUCCESS, payload: post.id });
  } catch (e) {
    dispatch({ type: types.POST_CREATE_ERROR, payload: e.message });
  }
};
