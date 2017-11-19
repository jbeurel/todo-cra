import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import { tagsReducer } from 'src/tags';
import { tasksReducer } from 'src/tasks';

export default combineReducers({
  tags: tagsReducer,
  tasks: tasksReducer,
  form: reduxFormReducer
});
