
module.exports = {

    uploadFile: function (file) {
        return new Promise(
            function (resolve, reject) {
                Firebase.bucket.upload(file,
                    function (err, aclObject) {
                        if (!err) {
                            var path = require("path");
                            var extension = path.extname(file);
                            var fileName = path.basename(file);

                            console.log("load", file);
                            // https://firebasestorage.googleapis.com/v0/b/dacn-63324.appspot.com/o/94494033-86d8-44a9-ae17-f4a748082822.png?alt=media
                            // https://firebasestorage.googleapis.com/v0/b/dacn-63324.appspot.com/o/1238fdc1-6da2-47b0-993b-5e8aa792b031.png?
                            var URL = "https://firebasestorage.googleapis.com/v0/b/" + Firebase.storageFirebase.bucket + "/o/" + fileName + "?alt=media";
                            resolve(URL);
                        } else {
                            console.log("Failed to set permissions: " + err);
                            reject(null);
                        }
                    });
            });
    },

    getUser: function (email) {
        return new Promise(
            function (resolve, reject) {
                admin.auth().getUserByEmail(email)
                    .then(function (userRecord) {
                        console.log("Successfully fetched user data:", userRecord.toJSON());
                        resolve(userRecord);
                        // See the UserRecord reference doc for the contents of userRecord.
                    })
                    .catch(function (error) {
                        console.log("Failed to set permissions: " + error);
                        reject(error);
                    });
            });
    },

    destroyFile: function (path) {
        return new Promise(
            function (resolve, reject) {
                Firebase.bucket.file(path)
                file.delete().then(() => {
                    resolve('ok')
                    console.log(path)
                }).catch(err => {
                    reject(error);
                    console.log(`Failed to remove photo, error: ${err}`)
                });

            });
    }

}