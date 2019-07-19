module.exports = {

	friendlyName: 'Order Detail creator',

	inputs: {
		productId: {
			type: 'string',
			required: true
		},
		productName: {
			type: 'string',
			required: true
		},
		price: {
			type: 'number',
			defaultsTo: 0,
		},
		description: {
			type: 'string',
		},
		quantity: {
			type: 'number',
			defaultsTo: 1,
		},
		inCart: {
			type: 'boolean',
			defaultsTo: true,
		},
		createdBy: {
			type: 'string',
			required: true
		}
	},

	fn: async (inputs, exits) => {

		const waitCreate = await OrderItem.create(inputs).fetch()

		return waitCreate ? exits.success(waitCreate) : exits.error()

	}
};

