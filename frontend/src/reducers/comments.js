import * as types from '../types';

const initialState = {
  loading: true,
  error: '',
  comments: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        comments: action.payload
      };
    case types.FETCH_COMMENTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        comments: []
      };
    case types.RESET_COMMENTS:
      return initialState;
    case types.COMMENT_CREATE_SUCCESS:
      return { ...state, comments: [...state.comments, action.payload] };
    case types.COMMENT_EDIT_SUCCESS:
      const commentToEdit = action.payload;
      const filteredCommentsEdit = state.comments.filter(
        c => c.id !== commentToEdit.id
      );
      return { ...state, comments: [...filteredCommentsEdit, commentToEdit] };
    case types.COMMENTS_DELETE:
      const commentToDelete = action.payload;
      const filteredCommentsDelete = state.comments.filter(
        c => c.id !== commentToDelete.id
      );
      const deletedComment = { ...commentToDelete, deleted: true };
      return {
        ...state,
        comments: [...filteredCommentsDelete, deletedComment]
      };
    case types.COMMENTS_VOTE:
      const commentToVote = action.payload;
      const filteredCommentsVote = state.comments.filter(
        c => c.id !== commentToVote.id
      );
      return { ...state, comments: [...filteredCommentsVote, commentToVote] };
    default:
      return state;
  }
};
