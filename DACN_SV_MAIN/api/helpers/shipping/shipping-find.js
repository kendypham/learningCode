module.exports = {
	inputs: {

	},

	fn: async (inputs, exits) => {
		let waitRead = await Shipping.find({ where: {} })
		try {
			for (let shipping of waitRead) {
				var waitReadOrder = await sails.helpers.order.orderFindOneRaw.with({ id: shipping.orderId })
				if (waitReadOrder)
					shipping.order = waitReadOrder
				var history = await sails.helpers.shippinghistory.shippingHistoryFindByShipping.with({ shippingId: shipping.id })

				if (history)
					shipping['history'] = history

			}
			return exits.success(waitRead);
		} catch (err) {
			return exits.error(err);
		}
	}
}