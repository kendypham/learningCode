module.exports = {
	inputs: {
		id: {
			type: 'string',
			unique: true,
		},
	},

	fn: async (inputs, exits) => {

		const { id } = inputs

		const waitRead = await OrderHistory.findOne({ id })
		return exits.success(waitRead);
	}
}