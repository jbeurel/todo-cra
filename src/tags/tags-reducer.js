export function tagsReducer(state = {tags: []}, action) {

    switch (action.type) {
        case 'TAG_ADDED':
            // TODO: Remplacer par une fonction immutable
            console.log('coucou state before', state);

            return Object.assign({}, state, {
                tags: [
                    ...state.tags,
                    {
                        key: action.tag.title,
                        title: action.tag.body
                    }
                ]
            });

        case 'TAG_MODIFIED':

        default:
            return state;
    }
}
