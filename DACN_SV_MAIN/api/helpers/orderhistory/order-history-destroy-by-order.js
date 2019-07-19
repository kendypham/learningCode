module.exports = {

	inputs: {
		orderId: {
			type: 'string',
			required: true,
		},
	},

	fn: async (inputs, exits) => {

		const { orderId } = inputs

		waitDelete = await OrderHistory.destroy({ orderId })
		return waitDelete ? exits.success(id) : exits.success('idNotFound')
	}
}