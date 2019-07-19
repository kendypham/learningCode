module.exports = {
	inputs: {
		name: {
			type: 'string',
			required: true
		},
		parentId: {
			type: 'string',
			defaultsTo: 'root',
		},
		description: {
			type: 'string',
			defaultsTo: 'Thông tin chưa được cung cấp.',
		},
	},

	fn: async (inputs, exits) => {

		const waitCreate = await Category.create(inputs).fetch()

		return waitCreate ? exits.success(waitCreate) : exits.error()

	}
}