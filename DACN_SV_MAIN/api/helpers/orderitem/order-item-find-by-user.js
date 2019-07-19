module.exports = {
	inputs: {
		createdBy: {
			type: 'string',
			required: true,
		},
	},

	fn: async (inputs, exits) => {
		const { createdBy } = inputs
		const waitRead = await OrderItem.find({ where: { createdBy: createdBy } })
		try {
			for (let item of waitRead) {
				const images = await sails.helpers.image.imageEntryFind.with({ productId: item.productId })
				item.images = images
			}
		} catch (e) {
			return exits.error(e);
		}
		return exits.success(waitRead);
	}
}