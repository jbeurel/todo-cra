import firebase from 'firebase';
import { eventChannel, END, delay, buffers } from 'redux-saga';
import { call, take, race, delay } from 'redux-saga/effects';
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
            })});

        return() => console.log('coucou stop')
    }, buffers.expanding(5 ));
}

export function* firabseSagas() {
    const chan = yield call(firebaseChannel)
    while (true) {
        const snapshot = yield take(chan);

        console.log('coucoucou', snapshot)
    }
}

async function getTags() {
    return db.collection('tags').get();
}

function* getTagsSaga() {
    yield put({type: 'SET_LOADING');
    try {
        const tags = yield race([
            call(getTags),
            delay(5000),
        ]);
    }

    } finally {
        yield put({type: 'UNSET_LOADING');
    }
}


function* () {
    yield takeEvery('GET_SAGAS', getTagsSaga);
}

export default function*() {
    yield all([
        fork(firebaseSaga), fork()
    ])
}