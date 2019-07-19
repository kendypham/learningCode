module.exports = {
	identity: 'Image',
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
		productId: {
			type: 'string',
			required: true,
		},
		url: {
			type: 'string',
			required: true,
		},
	},

	beforeCreate: (obj, next) => {
		Image.find({ where: { index: { '>': '0' } }, sort: 'index DESC', limit: 1 }).exec((err, max) => {
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
	},
}