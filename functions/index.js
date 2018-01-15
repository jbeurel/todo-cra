"use strict";

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const twitter = require("twitter-text");

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

exports.tagLinking = functions.firestore
  .document("/tasks/{taskId}")
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
                // console.log("coucou ref", ref);
                // console.log("coucou ref.id", ref.id);
                console.log("coucou ref.path", ref.path);
                db
                  .collection("tasks")
                  .doc(event.params.taskId)
                  .collection("tags")
                  .add({ ref: ref.path })
                  .catch(error => {
                    console.log("coucou 2 error", error);
                  });
              });
          } else {
            // console.log("coucou snapshot.docs[0].ref", snapshot.docs[0].ref);
            // console.log("coucou snapshot.docs[0].id", snapshot.docs[0].id);
            console.log(
              "coucou snapshot.docs[0].ref.path",
              snapshot.docs[0].ref.path
            );
            db
              .collection("tasks")
              .doc(event.params.taskId)
              .collection("tags")
              .add({ ref: snapshot.docs[0].ref.path })
              .catch(error => {
                console.log("coucou 2 error", error);
              });
          }
        })
        .catch(error => console.log("coucou error", error));
    });

    return event.data.ref.set(
      {
        label: event.data.data().label.toLowerCase()
      },
      { merge: true }
    );
  });
