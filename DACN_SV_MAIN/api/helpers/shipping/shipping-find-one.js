module.exports = {
	inputs: {
		id: {
			type: 'string',
			unique: true,
		},
	},

	fn: async (inputs, exits) => {

		const { id } = inputs

		const waitRead = await Shipping.findOne({ where: { id: id } })
		try {
			if (waitRead)
				var waitReadOrder = await sails.helpers.order.orderFindOneRaw.with({ id: waitRead.orderId })
			if (waitReadOrder)
				waitRead.order = waitReadOrder
			waitRead.orderId = undefined

			var waitReadHistory = await sails.helpers.shippinghistory.shippingHistoryFindByShipping.with({ shippingId: waitRead.id })
			if (waitReadHistory)
				waitRead.history = waitReadHistory

			return exits.success(waitRead);
		} catch (err) {
			return exits.error(err);
		}
	}
}