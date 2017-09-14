import { combineReducers } from 'redux';

import categories from './categories';
import comments from './comments';
import post from './post';
import posts from './posts';

export default combineReducers({ categories, comments, post, posts });
