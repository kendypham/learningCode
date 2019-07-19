module.exports = {

	inputs: {
		id: {
			type: 'string',
			required: true,
		},
	},

	fn: async (inputs, exits) => {

		const { id } = inputs
		waitDelete = await OrderHistory.destroy({ id })
		return waitDelete ? exits.success(id) : exits.success('idNotFound')
	}
}