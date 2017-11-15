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

function* modifyData(data) {
    console.log('coucou saga tag', data);
    db.collection('tags').doc(data.tag.id).set(data.tag);
    // yield call(db.collection('tags').doc(tag.id).set, tag);
}

function* modifyDataSagas() {
    console.log('coucou modifyDataSagas initialisation');
    yield takeEvery("TAG_MODIFY", modifyData);
}

export default function*() {
    yield all([
        fork(firebaseSagas),
        fork(modifyDataSagas)
    ])
}
