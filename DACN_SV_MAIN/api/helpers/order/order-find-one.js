module.exports = {
	inputs: {
		id: {
			type: 'string',
			required: true,
		},
	},

	fn: async (inputs, exits) => {

		const { id } = inputs
		const waitRead = await Order.findOne({ where: { id: id } })
		try {

			waitRead.orderItems = []
			for (let detailId of waitRead.orderItemIds) {
				const waitReadDetail = await sails.helpers.orderitem.orderItemFindOne.with({ id: detailId })
				if (waitReadDetail)
					waitRead.orderItems.push(waitReadDetail)
			}
			const waitReadLocation = await sails.helpers.location.locationFindOne.with({ id: waitRead.locationId })
			const waitReadHistory = await sails.helpers.orderhistory.orderHistoryFindByOrder.with({ orderId: id })
			const waitReadCarrier = await sails.helpers.carrier.carrierFindOneRaw.with({ id: waitRead.carrierId })
			const waitReadCarrierService = await sails.helpers.carrierservice.carrierServiceFindOne.with({ id: waitRead.carrierServiceId })

			waitRead.carrier = waitReadCarrier
			waitRead.carrierService = waitReadCarrierService
			waitRead.carrierId = undefined
			waitRead.carrierServiceId = undefined
			waitRead.location = waitReadLocation
			waitRead.history = waitReadHistory
			waitRead.locationId = undefined
			waitRead.orderItemIds = undefined
			return exits.success(waitRead);
		} catch (err) {
			return exits.error(err);
		}
	}
}