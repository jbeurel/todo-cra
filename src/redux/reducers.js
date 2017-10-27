import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import { tagsReducer } from 'src/tags';

export default combineReducers({
  tags: tagsReducer,
  form: reduxFormReducer
});
