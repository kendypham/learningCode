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
		const waitDelete = await Favorite.destroyOne({ userId, productId })
		return waitDelete ? exits.success(id) : exits.success('idNotFound')
	}
}