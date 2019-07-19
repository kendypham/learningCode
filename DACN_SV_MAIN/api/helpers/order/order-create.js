module.exports = {

	friendlyName: 'Shipping creator',

	inputs: {
		firstName: {
			type: 'string',
			required: true
		},
		lastName: {
			type: 'string',
		},
		email: {
			type: 'string',
		},
		phoneNumber: {
			type: 'string',
		},
		locationId: {
			type: 'string',
		},
		orderItemIds: {
			type: 'json',
			columnType: 'array',
		},
		status: {
			type: 'string',
			isIn: ['Confirming', 'Approved', 'Rejected', 'Canceled', 'On hold', 'Shipping', 'Delivered', 'Refunded',
				'Paid', 'Error'],
			defaultsTo: 'Confirming',
		},
		description: {
			type: 'string',
		},
		paymentMethod: {
			type: 'string',
			isIn: ['COD', 'Store', 'Gateway', 'Online'],
			defaultsTo: 'COD',
		},
		totalPrice: {
			type: 'number',
			columnType: 'float',
			defaultsTo: 0,
		},
		paymentCode: {
			type: 'string',
		},
		// paymentGateway: {
		//   type: 'string',
		// },
		carrierId: {
			//Hãng vận chuyển
			type: 'string',
			required: true
		},
		carrierServiceId: {
			//Dịch vụ vận chuyển
			type: 'string',
			required: true
		},
		deliveryDate: {
			//Ngày Nhận
			type: 'ref',
			columnType: 'datetime'
		},
		weight: {
			//gr
			type: 'number',
			columnType: 'float',
			defaultsTo: 500,
		},
		couponCode: {
			type: 'string',
		},
		shipFee: {
			type: 'number',
			columnType: 'float',
			required: true
		},
		createdBy: {
			type: 'string',
			required: true
		}
	},

	fn: async (inputs, exits) => {

		const waitCreate = await Order.create(inputs).fetch()
		return waitCreate ? exits.success(waitCreate) : exits.error()

	}
};

