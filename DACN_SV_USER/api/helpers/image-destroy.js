let path = require("path");
module.exports = {
	inputs: {
		fileName: {
			type: 'ref',
			required: true,
		}
	},

	fn: async (inputs, exits) => {
		let fileName = path.basename(inputs.fileName);

		if (fileName.indexOf('?') > 0)
			fileName = fileName.split('?')[0]
		if (fileName.indexOf('/') > 0)
			fileName = fileName.split('/')[0]
		await Firebase.bucket.file(fileName).delete().then(() => {
			console.log('Successfully deleted photo with UID')
			return exits.success(fileName);
		}).catch(err => {
			console.log(`Failed to remove photo, error: ${err}`)
			return exits.error(err);
		});
	},
}