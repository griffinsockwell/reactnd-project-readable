import * as types from '../types';

const initialState = {
  loading: true,
  error: '',
  post: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        post: action.payload
      };
    case types.FETCH_POST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        post: {}
      };
    case types.RESET_POST:
      return initialState;
    case types.POSTS_DELETE:
      const postToDelete = action.payload;
      return { ...state, post: { ...postToDelete, deleted: true } };
    case types.POSTS_VOTE:
      const postToVote = action.payload;
      return { ...state, post: postToVote };
    case types.POSTS_COMMENTS:
      const comments = action.payload;
      const post = { ...state.post, comments };
      return { ...state, post };
    case types.COMMENT_CREATE_SUCCESS:
      const postWithNewComment = {
        ...state.post,
        comments: [...state.post.comments, action.payload]
      };
      return { ...state, post: postWithNewComment };
    case types.COMMENTS_DELETE:
      const commentToDelete = action.payload;
      const filteredComments = state.post.comments.filter(
        c => c.id !== commentToDelete.id
      );
      const postWithDeletedComment = {
        ...state.post,
        comments: filteredComments
      };
      return { ...state, post: postWithDeletedComment };
    default:
      return state;
  }
};
