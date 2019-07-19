module.exports = {
	inputs: {
		parentId: {
			type: 'string',
		},
	},

	fn: async (inputs, exits) => {

		const { parentId } = inputs
		var waitRead = null;
		if (parentId)
			waitRead = await Category.find({ parentId: parentId })
		else
			waitRead = await Category.find({ where: {} })

		return exits.success(waitRead);
	}
}