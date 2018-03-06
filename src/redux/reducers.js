import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import { tagsReducer } from 'src/redux/entities/tags';
import { tasksReducer } from 'src/redux/entities/tasks';

export default combineReducers({
  tags: tagsReducer,
  tasks: tasksReducer,
  form: reduxFormReducer
});
