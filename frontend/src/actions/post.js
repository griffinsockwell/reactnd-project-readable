import * as types from '../types';
import { getPost } from '../api';

export const fetchPost = id => async dispatch => {
  try {
    const res = await getPost(id);
    const post = await res.json();
    dispatch({ type: types.FETCH_POST_SUCCESS, payload: post });
  } catch (e) {
    dispatch({ type: types.FETCH_POST_ERROR, payload: e.message });
  }
};

export const resetPost = () => ({ type: types.RESET_POST });
