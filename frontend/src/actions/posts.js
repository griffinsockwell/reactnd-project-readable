import * as types from '../types';
import {
  getPosts,
  getPostsForCategory,
  deletePost,
  postPostsVote,
  getPostsComments
} from '../api';

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

export const setPostsOrder = order => ({
  type: types.POSTS_SET_ORDER,
  payload: order
});

export const removePost = post => async dispatch => {
  try {
    await deletePost(post.id);
    dispatch({ type: types.POSTS_DELETE, payload: post });
  } catch (e) {
    console.log(e.message);
  }
};

export const voteForPost = (post, option) => async dispatch => {
  try {
    const res = await postPostsVote(post.id, option);
    const postResponse = await res.json();
    dispatch({ type: types.POSTS_VOTE, payload: postResponse });
  } catch (e) {
    console.log(e.message);
  }
};

export const commentsForPost = post => async dispatch => {
  try {
    const res = await getPostsComments(post.id);
    const comments = await res.json();
    dispatch({ type: types.POSTS_COMMENTS, payload: comments });
  } catch (e) {
    console.log(e);
  }
};
