module.exports = {
	inputs: {
		file: {
			type: 'ref',
			required: true,
		}
	},

	fn: async (inputs, exits) => {
		await Firebase.bucket.upload(inputs.file, (err, aclObj) => {
			if (!err) {
				let path = require("path");
				// let extension = path.extname(inputs.file);
				let fileName = path.basename(inputs.file);

				// https://firebasestorage.googleapis.com/v0/b/dacn-63324.appspot.com/o/94494033-86d8-44a9-ae17-f4a748082822.png?alt=media
				// https://firebasestorage.googleapis.com/v0/b/dacn-63324.appspot.com/o/1238fdc1-6da2-47b0-993b-5e8aa792b031.png?
				let URL = "https://firebasestorage.googleapis.com/v0/b/" + Firebase.storageBucket + "/o/" + fileName + "?alt=media";



				return exits.success(URL);
			} else {
				console.log("Failed to set permissions: " + err);
				return exits.error(null);
			}
		})
	},
}