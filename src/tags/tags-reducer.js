import { List, Map } from 'immutable';
const init = Map();

export function tagsReducer(state = init, action) {

    switch (action.type) {
        case 'TAG_ADDED':
            return state.set(action.tag.id, action.tag);

        default:
            return state;
    }
}
