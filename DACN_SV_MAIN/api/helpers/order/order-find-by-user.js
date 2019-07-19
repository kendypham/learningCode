module.exports = {
	inputs: {
		createdBy: {
			type: 'string',
			required: true,
		},
	},

	fn: async (inputs, exits) => {
		const { createdBy } = inputs
		const waitRead = await Order.find({ where: { createdBy: createdBy } })
		try {
			for (let order of waitRead) {
				order.orderItems = []
				for (let detailId of order.orderItemIds) {
					const waitReadDetail = await sails.helpers.orderitem.orderItemFindOne.with({ id: detailId })
					if (waitReadDetail)
						order.orderItems.push(waitReadDetail)
				}
				const waitReadLocation = await sails.helpers.location.locationFindOne.with({ id: order.locationId })
				const waitReadHistory = await sails.helpers.orderhistory.orderHistoryFindByOrder.with({ orderId: order.id })
				const waitReadCarrier = await sails.helpers.carrier.carrierFindOneRaw.with({ id: order.carrierId })
				const waitReadCarrierService = await sails.helpers.carrierservice.carrierServiceFindOne.with({ id: order.carrierServiceId })

				order.carrier = waitReadCarrier
				order.carrierService = waitReadCarrierService
				order.carrierId = undefined
				order.carrierServiceId = undefined
				order.location = waitReadLocation
				order.history = waitReadHistory
				order.locationId = undefined
				order.orderItemIds = undefined
			}
			return exits.success(waitRead);
		} catch (err) {
			return exits.error(err);
		}
	}
}