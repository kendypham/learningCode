module.exports = {
	inputs: {
		orderId: {
			type: 'string',
			required: true,
		},
	},

	fn: async (inputs, exits) => {

		const { orderId } = inputs

		let waitRead = await OrderHistory.find({ orderId })

		return exits.success(waitRead);
	}
}