import * as types from '../types';
import { getPost, postEditPost } from '../api';

export const fetchPostToEdit = id => async dispatch => {
  try {
    const res = await getPost(id);
    const post = await res.json();
    dispatch({ type: types.POST_EDIT_FETCH_SUCESS, payload: post });
  } catch (e) {
    dispatch({ type: types.POST_EDIT_FETCH_ERROR, payload: e.message });
  }
};

export const resetPostToEdit = () => ({ type: types.POST_EDIT_RESET });

export const setTextForPostEdit = (name, value) => ({
  type: types.POST_EDIT_SET_TEXT,
  payload: { name, value }
});

export const postEdit = (values, postId) => async dispatch => {
  dispatch({ type: types.POST_EDIT_SUBMITTING });
  try {
    const res = await postEditPost(values, postId);
    const post = await res.json();
    dispatch({ type: types.POST_EDIT_SUCCESS, payload: post.id });
  } catch (e) {
    dispatch({ type: types.POST_EDIT_ERROR, payload: e.message });
  }
};
