module.exports = {
	inputs: {
		shippingId: {
			type: 'string',
			required: true
		},
		status: {
			type: 'string',
			isIn: ['Preparing', 'Shipping', 'On Hold', 'Unshipped', 'Out For Delivery', 'Delivered'],
			defaultsTo: 'Preparing',
		},
		description: {
			type: 'string',
		},
	},
	fn: async (inputs, exits) => {

		const waitCreate = await ShippingHistory.create(inputs).fetch()

		return waitCreate ? exits.success(waitCreate) : exits.error()

	}
}