"use strict";

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const twitter = require("twitter-text");

admin.initializeApp(functions.config().firebase);

exports.tagLinking = functions.firestore
  .document("/tasks/{tasksId}")
  .onWrite(event => {
    const tags = twitter.extractHashtags(event.data.data().label);
    console.log("coucou tags", tags);
    // admin
    //   .firestore()
    //   .collection("tags")
    //   .add({ title: "coucou", body: "functiooooon" });

    return event.data.ref.set(
      {
        label: event.data.data().label.toUpperCase()
      },
      { merge: true }
    );
  });
