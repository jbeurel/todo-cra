"use strict";

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const twitter = require("twitter-text");

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

exports.tagLinking = functions.firestore
  .document("/tasks/{tasksId}")
  .onWrite(event => {
    const tagTitles = twitter.extractHashtags(event.data.data().label);
    console.log("coucou tagTitles", tagTitles);
    tagTitles.map(tagTitle => {
      db
        .collection("tags")
        .where("title", "==", tagTitle)
        .limit(1)
        .get()
        .then(snapshot => {
          console.log("coucou snapshot.docs.length", snapshot.docs.length);

          if (snapshot.empty) {
            db
              .collection("tags")
              .add({ title: tagTitle, body: "" })
              .then(ref => {
                console.log("coucou ref.id", ref.id);
              });
          } else {
            console.log("coucou snapshot.docs[0].id", snapshot.docs[0].id);
          }
        })
        .catch(() => console.log("coucou rien"));
    });

    return event.data.ref.set(
      {
        label: event.data.data().label.toLowerCase()
      },
      { merge: true }
    );
  });
