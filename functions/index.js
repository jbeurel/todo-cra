"use strict";

const functions = require("firebase-functions");

exports.makeUppercase = functions.firestore
  .document("/tasks/{tasksId}")
  .onWrite(event => {
    console.log("coucou makeUppercase event", event);
    console.log("coucou makeUppercase event.data.data()", event.data.data());
    return event.data.ref.set(
      {
        label: event.data.data().label.toUpperCase()
      },
      { merge: true }
    );
  });
