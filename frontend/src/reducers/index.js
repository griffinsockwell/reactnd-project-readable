import { combineReducers } from 'redux';

import categories from './categories';
import comments from './comments';
import post from './post';
import postCreate from './postCreate';
import posts from './posts';

export default combineReducers({
  categories,
  comments,
  post,
  postCreate,
  posts
});
