const _ = require('underscore');

module.exports = {
	identity: 'Product',
	attributes: {
		id: {
			type: 'string',
			unique: true,
			columnName: '_id',
		},
		index: {
			type: 'number',
			defaultsTo: 1,
		},
		name: {
			type: 'string',
			required: true
		},
		seller: {
			type: 'string',
		},
		description: {
			type: 'string',
			defaultsTo: 'Thông tin chưa được cung cấp.',
		},
		categoryId: {
			type: 'string',
			required: true
		},
		oldPrice: {
			type: 'number',
			defaultsTo: 0,
		},
		price: {
			type: 'number',
			defaultsTo: 0,
		},
		buyerNum: {
			type: 'number',
			defaultsTo: 0,
		},
		color: {
			type: 'string',
		},
		rating: {
			type: 'number',
			columnType: 'float',
			defaultsTo: 0,
			custom: function (value) {
				return value <= 5
			}
		},
		listRating: {
			type: 'json',
			columnType: 'array',
		},
		quantity: {
			type: 'number',
			defaultsTo: 0
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
		width: {
			type: 'number',
		},
		height: {
			type: 'number',
		},
		//Số tháng bảo hành
		warrantyMonth: {
			type: 'string',
		},
		weight: {
			type: 'number',
		},
		hide: {
			type: 'boolean',
			defaultsTo: false,
		},
		quantitySold: {
			type: 'number',
			defaultsTo: 0,
		},
	},

	// customToJSON: () => {
	// 	return _.omit(this, ['id'])
	// },

	beforeCreate: (obj, next) => {
		Product.find({ where: { index: { '>': '0' } }, sort: 'index DESC', limit: 1 }).exec((err, max) => {
			if (err) next(err);
			else {
				if (max.length === 0) {
					obj['index'] = 1
					next(null)
				}
				obj['index'] = max[0].index + 1;
				next(null);
			}
		})
	}
}