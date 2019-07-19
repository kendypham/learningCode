module.exports = {
	inputs: {
		orderId: {
			type: 'string',
			required: true,
		},
		from: {
			type: 'string',
			required: true,
		},
		status: {
			type: 'string',
			isIn: ['Preparing', 'Shipping', 'On Hold', 'Unshipped', 'Out For Delivery', 'Delivered'],
			defaultsTo: 'Preparing',
		},
		codMoney: {
			type: 'number',
			required: true,
		},
		isBulkyGoods: {
			type: 'number',
			isIn: [0, 1],
			defaultsTo: 0,
		},
		/**
		 * 1 - Cho xem hàng, không cho thử
		 * 2 - Cho phép thử
		 * 3 - Không cho xem  hàng
		 */
		allowTest: {
			type: 'number',
		},
	},
	fn: async (inputs, exits) => {
		const waitCreate = await Shipping.create(inputs).fetch()
		return waitCreate ? exits.success(waitCreate) : exits.error()

	}
}