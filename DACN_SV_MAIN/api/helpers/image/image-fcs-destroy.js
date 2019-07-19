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

		// if (fileName.indexOf('?') > 0)
		// 	fileName = fileName.split('?')[0]
		// if (fileName.indexOf('/') > 0)
		// 	fileName = fileName.split('/')[0]
		console.log(fileName)
		await Firebase.bucket.file(`o/${fileName}`).delete().then(() => {
			console.log('Successfully deleted photo with id' + fileName)
			return exits.success(fileName);
		}).catch(err => {
			console.log(`Failed to remove photo, ${err}`)
			return exits.success(-1);
		});
	},
}