module.exports = {

	inputs: {
		id: {
			type: 'string',
			required: true,
		},
	},

	fn: async (inputs, exits) => {

		const { id } = inputs
		const waitDelete = await Shipping.destroyOne({ id })

		return waitDelete ? exits.success(id) : exits.success('idNotFound')
	}
}