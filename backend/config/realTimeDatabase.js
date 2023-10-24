const admin = require('firebase-admin');
const dotenv = require('dotenv')

admin.initializeApp({

  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)),

  databaseURL: 'https://rtdb-pt23-default-rtdb.firebaseio.com/'

});

const db = admin.database();

module.exports = db.ref('device');