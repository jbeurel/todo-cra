import firebase from 'firebase';
require("firebase/firestore");

firebase.initializeApp({
    apiKey: 'AIzaSyBnBNZHkxbhcjqDYLsQGZRt8faS2t7buvU',
    authDomain: 'todo-fb58f.firebaseapp.com',
    projectId: 'todo-fb58f'
});

const db = firebase.firestore();

export default function* sagas() {
    const tags = yield db.collection('tags').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.id, doc.data());
        });
    });
}
