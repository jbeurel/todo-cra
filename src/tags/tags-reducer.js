import { Map } from 'immutable';
const init = Map();

export function tagsReducer(state = init, action) {

    switch (action.type) {
        case 'TAG_ADDED':
        case 'TAG_MODIFIED':
            return state.set(action.tag.id, action.tag);
        case 'TAG_REMOVED':
            return state.delete(action.tag.id);
        default:
            return state;
    }
}
