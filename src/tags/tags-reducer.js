// const initialTags = [
//     {
//         key: '-KsAzPqNWt8onh71Nfq_',
//         title: 'coucou3'
//     },
//     {
//         key: '-KsAzPBlkzhIkV69UHf_',
//         title: 'test'
//     },
//     {
//         key: '-Ks5mm7_UW0wcIxooTGj',
//         title: 'cdsc'
//     },
//     {
//         key: '-Ks5mkiLUAUtEkDyi_fi',
//         title: 'test'
//     },
//     {
//         key: '-KqTy_XXJCZRlxADOrpF',
//         title: 'dddd'
//     },
//     {
//         key: '-KqNstfWJCokHJVUrWrw',
//         title: 'coucou'
//     }
// ];

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

            // state.push({
            //     key : action.tag.title,
            //     title : action.tag.body
            // });
            // console.log('coucou state after', state);
            // return state;
        default:
            return state;
    }
}
