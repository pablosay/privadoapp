const admin = require('firebase-admin');

const serviceAccount = require('../env/serviceAccountKey.json');

admin.initializeApp({

  credential: admin.credential.cert(serviceAccount),

  databaseURL: 'https://rtdb-pt23-default-rtdb.firebaseio.com/'

});

const db = admin.database();

module.exports = db.ref('device');