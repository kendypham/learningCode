module.exports = {

	inputs: {
		id: {
			type: 'string',
			required: true,
		},
		dataToUpdate: {
			type: 'ref',
			required: true,
		}
	},

	fn: async (inputs, exits) => {
		const { id, dataToUpdate } = inputs

		const waitUpdate = await Rating.updateOne({ id }).set(dataToUpdate)

		return exits.success(waitUpdate);
	}
}