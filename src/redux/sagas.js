import firebase from "firebase";
import { eventChannel, buffers } from "redux-saga";
import { call, put, take, all, fork, takeEvery } from "redux-saga/effects";
import { tagActions } from "src/redux/entities/tags/tags.actions";
import { taskActions } from "src/redux/entities/tasks/tasks.actions";
require("firebase/firestore");

firebase.initializeApp({
  apiKey: "AIzaSyBnBNZHkxbhcjqDYLsQGZRt8faS2t7buvU",
  authDomain: "todo-fb58f.firebaseapp.com",
  projectId: "todo-fb58f"
});

const db = firebase.firestore();

function tagsChannel() {
  return eventChannel(emitter => {
    db.collection("tags").onSnapshot(snapshot => {
      snapshot.docChanges.forEach(change => {
        emitter(change);
      });
    });

    return () => console.log("coucou stop");
  }, buffers.expanding(5));
}

function tasksChannel() {
  return eventChannel(emitter => {
    db.collection("tasks").onSnapshot(snapshot => {
      snapshot.docChanges.forEach(change => {
        emitter(change);
      });
    });

    return () => console.log("coucou stop");
  }, buffers.expanding(5));
}

export function* firebaseTagsListener() {
  const chan = yield call(tagsChannel);
  while (true) {
    const change = yield take(chan);
    if (change.type === "added") {
      yield put(tagActions.added({ id: change.doc.id, ...change.doc.data() }));
    }
    if (change.type === "modified") {
      yield put(
        tagActions.modified({ id: change.doc.id, ...change.doc.data() })
      );
    }
    if (change.type === "removed") {
      yield put(
        tagActions.removed({ id: change.doc.id, ...change.doc.data() })
      );
    }
  }
}

export function* firebaseTasksListener() {
  const chan = yield call(tasksChannel);
  while (true) {
    const change = yield take(chan);
    if (change.type === "added") {
      yield put(taskActions.added({ id: change.doc.id, ...change.doc.data() }));
    }
    if (change.type === "modified") {
      yield put(
        taskActions.modified({ id: change.doc.id, ...change.doc.data() })
      );
    }
    if (change.type === "removed") {
      yield put(
        taskActions.removed({ id: change.doc.id, ...change.doc.data() })
      );
    }
  }
}

function* taskUpdater(data) {
  yield db
    .collection("tasks")
    .doc(data.task.id)
    .set(data.task);
}

function* taskRemover(data) {
  yield db
    .collection("tasks")
    .doc(data.task.id)
    .delete();
}

function* tagUpdater(data) {
  yield db
    .collection("tags")
    .doc(data.tag.id)
    .set(data.tag);
}

function* firebaseTagsUpdater() {
  yield takeEvery(tagActions.TAG_MODIFY, tagUpdater);
}

function* firebaseTasksUpdater() {
  yield takeEvery(taskActions.TASK_MODIFY, taskUpdater);
}

function* firebaseTasksRemover() {
  yield takeEvery(taskActions.TASK_REMOVE, taskRemover);
}

export default function*() {
  yield all([
    fork(firebaseTagsListener),
    fork(firebaseTagsUpdater),
    fork(firebaseTasksListener),
    fork(firebaseTasksUpdater),
    fork(firebaseTasksRemover)
  ]);
}
