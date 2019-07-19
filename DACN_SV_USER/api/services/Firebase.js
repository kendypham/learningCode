const admin = require("firebase-admin");
const serviceAccount = require("../../config/serviceAccountKey.json");
try {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
		databaseURL: "https://dacn-63324.firebaseio.com",
		storageBucket: "gs://dacn-63324.appspot.com/"
	});
} catch (err) {

}

module.exports.bucket = admin.storage().bucket();
module.exports.storageBucket = "dacn-63324.appspot.com"