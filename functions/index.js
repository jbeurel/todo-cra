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
        console.log("coucou documentReferences", documentReferences);
        documentReferences.forEach(documentReference => {
          console.log("coucou documentReference", documentReference);
          return db
            .collection("tasks")
            .doc(event.params.taskId)
            .collection("tags")
            .add({ ref: documentReference.path })
            .then(documentReference => {
              console.log("coucou documentReference", documentReference.path);
            })
            .catch(error => {
              console.log("coucou 2 error", error);
            });
        });
      })
      .then(result => {
        console.log("coucou ! result", result);
      });

    // Problème : Chaque sauvegarde de task ajoute des relations avec
    // les tags au lieu de remplacer la liste existante.

    return event.data.ref.set(
      {
        label: event.data.data().label.toLowerCase()
      },
      { merge: true }
    );
  });
