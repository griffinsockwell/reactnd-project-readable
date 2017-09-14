import { combineReducers } from 'redux';

import categories from './categories';
import commentCreate from './commentCreate';
import commentEdit from './commentEdit';
import comments from './comments';
import post from './post';
import postCreate from './postCreate';
import postEdit from './postEdit';
import posts from './posts';

export default combineReducers({
  categories,
  commentCreate,
  commentEdit,
  comments,
  post,
  postCreate,
  postEdit,
  posts
});
