import { Map } from 'immutable';
import { tagActions} from "src/tags/actions";

const init = Map();

export function tagsReducer(state = init, action) {
    switch (action.type) {
        case tagActions.TAG_ADDED:
        case tagActions.TAG_MODIFIED:
            return state.set(action.tag.id, action.tag);
        case tagActions.TAG_REMOVED:
            return state.delete(action.tag.id);
        default:
            return state;
    }
}
