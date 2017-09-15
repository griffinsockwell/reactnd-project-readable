import * as types from '../types';

const initialState = {
  loading: true,
  error: '',
  posts: [],
  order: 'timestamp'
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        posts: action.payload
      };
    case types.FETCH_POSTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        posts: []
      };
    case types.RESET_POSTS:
      return initialState;
    case types.POSTS_SET_ORDER:
      return { ...state, order: action.payload };
    case types.POSTS_DELETE:
      const postToDelete = action.payload;
      const filteredPosts = state.posts.filter(p => p.id !== postToDelete.id);
      const deletedPost = { ...postToDelete, deleted: true };
      return { ...state, posts: [...filteredPosts, deletedPost] };
    case types.POSTS_VOTE:
      const postToVote = action.payload;
      const filteredPostsVote = state.posts.filter(p => p.id !== postToVote.id);
      return { ...state, posts: [...filteredPostsVote, postToVote] };
    default:
      return state;
  }
};
