module.exports = {
	inputs: {
		orderId: {
			type: 'string',
			required: true,
		},
		carrierId: {
			type: 'string',
			required: true,
		},
		carrierServiceId: {
			type: 'string',
			required: true,
		},
	},

	fn: async (inputs, exits) => {
		const { orderId, carrierId, carrierServiceId } = inputs
		const order = await Order.findOne({ where: { id: orderId } })
		// // const carrier = await Carrier.findOne({ where: { id: carrierId } })
		// const carrierService = await CarrierService.findOne({ where: { id: carrierServiceId } })

		return order ? exits.success(order) : exits.error()
	}
}