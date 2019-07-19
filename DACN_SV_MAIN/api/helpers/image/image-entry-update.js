module.exports = {
	inputs: {
		entryId: {
			type: 'string',
			required: true,
		},
		data: {
			type: 'ref',
			required: true,
		}
	},

	fn: async (inputs, exits) => {

		const { entryId, data } = inputs
		const { url } = data

		const waitUpdate = await Image.updateOne({ id: entryId }).set({url})

		return exits.success(waitUpdate)
	}
}