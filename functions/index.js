"use strict";

const functions = require("firebase-functions");
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.makeUppercase = functions.firestore
  .document("/tasks/{tasksId}")
  .onWrite(event => {
    admin.firestore().collection('tags').add({title: 'coucou', body: 'functiooooon'});

    // console.log("coucou makeUppercase event", event);
    // console.log("coucou makeUppercase event.data.data()", event.data.data());
    return event.data.ref.set(
      {
        label: event.data.data().label.toUpperCase()
      },
      { merge: true }
    );
  });



//
// return docRef.collection('comments').orderBy('createdAt', 'desc')
//   .get()
//   .then(querySnapshot => {
//     // get the total comment count
//     const commentCount = querySnapshot.size
//     const recentComments = []
//     // add data from the 5 most recent comments to the array
//     querySnapshot.forEach(doc => {
//       recentComments.push( doc.data() )
//     });
//     recentComments.splice(5)
//     // record last comment timestamp
//     const lastActivity = recentComments[0].createdAt
//     // data to update on the document
//     const data = { commentCount, recentComments, lastActivity }
//
//     // run update
//     return docRef.update(data)
//   })
//   .catch(err => console.log(err) )