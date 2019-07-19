module.exports = {
	inputs: {
		shippingId: {
			type: 'string',
			required: true,
		},
	},

	fn: async (inputs, exits) => {

		const { shippingId } = inputs

		let waitRead = await ShippingHistory.find({ shippingId })

		return exits.success(waitRead);
	}
}