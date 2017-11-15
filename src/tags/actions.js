export const tagActions = {
    TAG_MODIFY: 'TAG_MODIFY',
    TAG_ADDED: 'TAG_ADDED',
    TAG_MODIFIED: 'TAG_MODIFIED',
    TAG_REMOVED: 'TAG_REMOVED',

    modify: tag => ({
        type: tagActions.TAG_MODIFY,
        tag
    }),

    added: tag => ({
        type: tagActions.TAG_ADDED,
        tag
    }),

    modified: tag => ({
        type: tagActions.TAG_MODIFIED,
        tag
    }),

    removed: tag => ({
        type: tagActions.TAG_REMOVED,
        tag
    })
};
