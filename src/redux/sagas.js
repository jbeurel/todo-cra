import firebase from 'firebase';
import { eventChannel, buffers } from 'redux-saga';
import { call, take, all, fork, delay } from 'redux-saga/effects';
require("firebase/firestore");

firebase.initializeApp({
    apiKey: 'AIzaSyBnBNZHkxbhcjqDYLsQGZRt8faS2t7buvU',
    authDomain: 'todo-fb58f.firebaseapp.com',
    projectId: 'todo-fb58f'
});

const db = firebase.firestore();

function firebaseChannel() {
    return eventChannel(emitter => {

        db.collection('tags').onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                emitter(doc.data())
            })}
        );

        return() => console.log('coucou stop')
    }, buffers.expanding(5));
}

export function* firebaseSagas() {
    const chan = yield call(firebaseChannel);
    while (true) {
        const snapshot = yield take(chan);
        console.log('Coucou Snapshot', snapshot)
    }
}

export default function*() {
    yield all([
        fork(firebaseSagas)
    ])
}
