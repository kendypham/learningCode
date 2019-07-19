module.exports = {
	inputs: {
		productId: {
			type: 'string',
			required: true,
		},
		url: {
			type: 'string',
			required: true,
		},
	},

	fn: (inputs, exits) => {
		const waitCreate = Image.create(inputs).fetch()

		return waitCreate ? exits.success(waitCreate) : exits.error()
	}
}