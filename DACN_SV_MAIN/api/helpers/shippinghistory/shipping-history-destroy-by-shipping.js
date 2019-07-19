module.exports = {

	inputs: {
		shippingId: {
			type: 'string',
			required: true,
		},
	},

	fn: async (inputs, exits) => {

		const { shippingId } = inputs

		waitDelete = await ShippingHistory.destroy({ shippingId })
		return waitDelete ? exits.success(id) : exits.success('idNotFound')
	}
}