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
    case types.POSTS_COMMENTS:
      const comments = action.payload;
      if (comments.length) {
        const postArray = state.posts.filter(
          p => p.id === comments[0].parentId
        );
        const post = postArray[0];
        const addPost = { ...post, comments };
        const filteredPostsComments = state.posts.filter(p => p.id !== post.id);
        return { ...state, posts: [...filteredPostsComments, addPost] };
      } else {
        return state;
      }
    default:
      return state;
  }
};
