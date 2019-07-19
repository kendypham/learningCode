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

		const waitCreate = await Favorite.create(inputs).fetch()

		return waitCreate ? exits.success(waitCreate) : exits.error()

	}
}