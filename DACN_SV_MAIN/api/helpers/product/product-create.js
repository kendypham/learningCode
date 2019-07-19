module.exports = {

	friendlyName: 'Product creator',

	inputs: {
		name: {
			type: 'string',
			required: true
		},
		description: {
			type: 'string',
			defaultsTo: 'Thông tin chưa được cung cấp.',
		},
		categoryId: {
			type: 'string',
			required: true
		},
		price: {
			type: 'number',
			defaultsTo: 0,
		},
		oldPrice: {
			type: 'number',
			defaultsTo: 0,
		},
		seller: {
			type: 'string',
		},
		quantity: {
			type: 'number',
			defaultsTo: 0
		},
		buyerNum: {
			type: 'number',
			defaultsTo: 0,
		},
		showHot: {
			type: 'number',
			isIn: [0, 1],
			defaultsTo: 0,
		},
		showHome: {
			type: 'number',
			isIn: [0, 1],
			defaultsTo: 0,
		},
		//Số tháng bảo hành
		warrantyMonth: {
			type: 'string',
		},
		weight: {
			//cm
			type: 'number',
		},
		width: {
			//cm
			type: 'number',
		},
		height: {
			//cm
			type: 'number',
		},
		color: {
			type: 'string',
		},
		hide: {
			type: 'boolean',
			defaultsTo: false,
		},
	},

	fn: async (inputs, exits) => {

		const waitCreate = await Product.create(inputs).fetch()

		return waitCreate ? exits.success(waitCreate) : exits.error()

	}
};

