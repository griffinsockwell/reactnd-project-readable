import * as types from '../types';
import { getCategories } from '../api';

export const fetchCategories = () => async dispatch => {
  try {
    const res = await getCategories();
    const { categories } = await res.json();
    dispatch({ type: types.FETCH_CATEGORIES_SUCCESS, payload: categories });
  } catch (e) {
    dispatch({ type: types.FETCH_CATEGORIES_ERROR, payload: e.message });
  }
};
