"use strict";

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const twitter = require("twitter-text");
const Promise = require("bluebird");

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

exports.tagLinking = functions.firestore
  .document("/tasks/{taskId}")
  .onWrite(event => {
    const tagTitles = twitter.extractHashtags(event.data.data().label);
    console.log("coucou tagTitles", tagTitles);
    // Get or Create tag from firestore
    Promise.map(tagTitles, tagTitle => {
      return db
        .collection("tags")
        .where("title", "==", tagTitle)
        .limit(1)
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            // return DocumentReference of the created document
            return db.collection("tags").add({ title: tagTitle, body: "" });
          } else {
            // Return DocumentReference of the existing document
            return snapshot.docs[0].ref;
          }
        });
    })
      .then(documentReferences => {
        const paths = documentReferences.map(documentReference => {
          return documentReference.path;
        });
        console.log("coucou paths", paths);
        return db
          .collection("tasks")
          .doc(event.params.taskId)
          .set({ tags: paths }, { merge: true });
      })
      .then(result => {
        console.log("coucou !! result", result);
      });

    return event.data.ref.set(
      {
        label: event.data.data().label.toLowerCase()
      },
      { merge: true }
    );
  });
