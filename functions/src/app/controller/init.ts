import * as admin from "firebase-admin";

const serviceAccount = require("../../config/firebase-admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});