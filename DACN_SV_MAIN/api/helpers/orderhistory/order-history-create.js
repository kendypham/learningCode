module.exports = {
	inputs: {
		orderId: {
			type: 'string',
			required: true
		},
		status: {
			type: 'string',
			isIn: ['Draft', 'Confirming', 'Approved', 'Rejected', 'Canceled', 'On hold', 'Shipping', 'Delivered', 'Refunded',
				'Paid', 'Error'],
			defaultsTo: 'Confirming',
		},
		description: {
			type: 'string',
		},
	},
	fn: async (inputs, exits) => {

		const waitCreate = await OrderHistory.create(inputs).fetch()

		return waitCreate ? exits.success(waitCreate) : exits.error()

	}
}