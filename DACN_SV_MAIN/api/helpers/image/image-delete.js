
module.exports = {
	inputs: {
		fileURL: {
			type: 'string',
			required: true,
		}
	},

	fn: async (inputs, exits) => {
		// await Firebase.bucket.deleteFiles(inputs.fileURL)
	}
}