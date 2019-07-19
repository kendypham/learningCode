module.exports = {

	inputs: {
		id: {
			type: 'string',
			required: true,
		},
	},

	fn: async (inputs, exits) => {

		const { id } = inputs
		try {
			const waitRead = await Order.findOne({ where: { id } })

			for (let detailId of waitRead.orderItemIds) {
				await sails.helpers.orderitem.orderItemDestroy.with({ id: detailId })
			}
			await sails.helpers.location.locationDestroy.with({ id: waitRead.locationId })
			const waitDelete = await Order.destroyOne({ id })

			return waitDelete ? exits.success(id) : exits.success('idNotFound')
		} catch (err) {
			exits.error(err)
		}
	}
}