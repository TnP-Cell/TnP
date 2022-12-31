const {
  intializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

const serviceAccount = require("./training-and-placement-iiitbh-e4716d52c589.json");

intializeApp({
  credential: cert(serviceAccount),
});

module.exports = getFirestore();
