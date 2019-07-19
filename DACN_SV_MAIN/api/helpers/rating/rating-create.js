module.exports = {
	inputs: {
		userId: {
			type: 'string',
			requid: true,
		},
		productId: {
			type: 'string',
			requid: true,
		},
		rating: {
			type: 'number',
			requid: true,
		},
		content: {
			type: 'string',
		},
	},
	fn: async (inputs, exits) => {

		const waitCreate = await Rating.create(inputs).fetch()

		return waitCreate ? exits.success(waitCreate) : exits.error()

	}
}