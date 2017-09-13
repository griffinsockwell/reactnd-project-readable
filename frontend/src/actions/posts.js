import * as types from '../types';
import { getPosts, getPostsForCategory } from '../api';

export const fetchPosts = () => async dispatch => {
  try {
    const res = await getPosts();
    const posts = await res.json();
    dispatch({ type: types.FETCH_POSTS_SUCCESS, payload: posts });
  } catch (e) {
    dispatch({ type: types.FETCH_POSTS_ERROR, payload: e.message });
  }
};

export const fetchPostsForCategory = category => async dispatch => {
  try {
    const res = await getPostsForCategory(category);
    const posts = await res.json();
    dispatch({ type: types.FETCH_POSTS_SUCCESS, payload: posts });
  } catch (e) {
    dispatch({ type: types.FETCH_POSTS_ERROR, payload: e.message });
  }
};

export const resetPosts = () => ({ type: types.RESET_POSTS });
