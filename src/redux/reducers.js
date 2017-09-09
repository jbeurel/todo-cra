import { combineReducers } from 'redux';
import { tagsReducer } from 'src/tags';

export default combineReducers({
  tags: tagsReducer
});
