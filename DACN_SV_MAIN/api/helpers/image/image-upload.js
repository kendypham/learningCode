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
				let extension = path.extname(inputs.file);
				let fileName = path.basename(inputs.file);

				let URL = "https://firebasestorage.googleapis.com/v0/b/" + Firebase.storageBucket + "/o/" + fileName + "?alt=media";
				return exits.success(URL);
			} else {
				console.log("Failed to set permissions: " + err);
				return exits.error(null);
			}
		})
	},
}