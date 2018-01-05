"use strict";

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

exports.makeUppercase = functions.firestore
  .document("/tasks/{tasksId}")
  .onWrite(event => {
    admin
      .firestore()
      .collection("tags")
      .add({ title: "coucou", body: "functiooooon" });

    return event.data.ref.set(
      {
        label: event.data.data().label.toUpperCase()
      },
      { merge: true }
    );
  });
