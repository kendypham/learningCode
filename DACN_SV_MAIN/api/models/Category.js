const _ = require('underscore');

module.exports = {

	identity: 'Category',

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
		parentId: {
			type: 'string',
			defaultsTo: 'root',
		},
		name: {
			type: 'string',
			unique: true,
			required: true
		},
		description: {
			type: 'string',
			defaultsTo: 'Thông tin chưa được cung cấp.',
		},
	},

	beforeCreate: (obj, next) => {
		Category.find({ where: { index: { '>': '0' } }, sort: 'index DESC', limit: 1 }).exec((err, max) => {
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