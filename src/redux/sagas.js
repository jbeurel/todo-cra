import firebase from 'firebase';
import { eventChannel, buffers } from 'redux-saga';
import { call, put, take, all, fork, takeEvery } from 'redux-saga/effects';
require("firebase/firestore");

firebase.initializeApp({
    apiKey: 'AIzaSyBnBNZHkxbhcjqDYLsQGZRt8faS2t7buvU',
    authDomain: 'todo-fb58f.firebaseapp.com',
    projectId: 'todo-fb58f'
});

const db = firebase.firestore();

function firebaseChannel() {
    return eventChannel(emitter => {

        db.collection('tags').onSnapshot((snapshot) => {
            snapshot.docChanges.forEach((change) => {
                emitter(change)
            })}
        );

        return() => console.log('coucou stop')
    }, buffers.expanding(5));
}

export function* firebaseSagas() {
    const chan = yield call(firebaseChannel);
    while (true) {
        const change = yield take(chan);
        if (change.type === "added") {
            // Todo: Stocker les donneés en utilisant data[doc.id] = doc.data -> https://github.com/prescottprue/redux-firestore/blob/e2b219aac5701dbdb0428b5b47be3000311258dd/src/utils/query.js
            yield put({type: "TAG_ADDED", tag: {id: change.doc.id, ...change.doc.data()}});
        }
        if (change.type === "modified") {
            yield put({type: "TAG_MODIFIED", tag: {id: change.doc.id, ...change.doc.data()}});
        }
        if (change.type === "removed") {
            yield put({type: "TAG_REMOVED", tag: {id: change.doc.id, ...change.doc.data()}});
        }
    }
}

function* modifyData(action) {
    const tag = yield call(db.collection('tags').doc(action.payload.id).set, action.payload);
    console.log('coucou saga tag', tag);
}

function* modifyDataSagas() {
    yield takeEvery("TAG_MODIFY", modifyData);
}

export default function*() {
    yield all([
        fork(firebaseSagas),
        fork(modifyDataSagas)
    ])
}
