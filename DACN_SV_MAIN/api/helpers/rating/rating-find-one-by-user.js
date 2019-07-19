module.exports = {
	inputs: {
		userId: {
			type: 'string',
		},
		productId: {
			type: 'string',
		},
	},

	fn: async (inputs, exits) => {

		const { userId, productId } = inputs

		const waitRead = await Rating.findOne({ userId, productId })
		return exits.success(waitRead);
	}
}