import { Map } from 'immutable';
import { taskActions } from "src/redux/entities/tasks/tasks.actions";

const init = Map();

export function tasksReducer(state = init, action) {
    switch (action.type) {
        case taskActions.TASK_ADDED:
        case taskActions.TASK_MODIFIED:
            return state.set(action.task.id, action.task);
        case taskActions.TASK_REMOVED:
            return state.delete(action.task.id);
        default:
            return state;
    }
}
