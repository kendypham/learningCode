module.exports = {
	inputs: {
		limit: {
			type: 'number',
		},
		skip: {
			type: 'number',
		},
		categoryId: {
			type: 'string',
		},
		maxPrice: {
			type: 'number',
		},
		minPrice: {
			type: 'number',
		},
	},

	fn: async (inputs, exits) => {
		const { categoryId, limit, skip, minPrice, maxPrice } = inputs
		if (String(categoryId).length < 1) {
			if (minPrice > -1 && maxPrice > -1)
				var waitRead = await Product.find({ where: { price: { '>=': minPrice, '<=': maxPrice } }, limit: limit, skip: skip })
			else if (minPrice > -1)
				var waitRead = await Product.find({ where: { price: { '>=': minPrice } }, limit: limit, skip: skip })
			else if (maxPrice > -1)
				var waitRead = await Product.find({ where: { price: { '<=': maxPrice } }, limit: limit, skip: skip })
			else
				var waitRead = await Product.find({ where: {}, limit: limit, skip: skip })
		} else {
			if (minPrice > -1 && maxPrice > -1)
				var waitRead = await Product.find({ where: { categoryId: categoryId, price: { '>=': minPrice, '<=': maxPrice } }, limit: limit, skip: skip })
			else if (minPrice > -1)
				var waitRead = await Product.find({ where: { categoryId: categoryId, price: { '>=': minPrice } }, limit: limit, skip: skip })
			else if (maxPrice > -1)
				var waitRead = await Product.find({ where: { categoryId: categoryId, price: { '<=': maxPrice } }, limit: limit, skip: skip })
			else
				var waitRead = await Product.find({ where: { categoryId: categoryId }, limit: limit, skip: skip })
		}
		return exits.success(waitRead);
	}
}