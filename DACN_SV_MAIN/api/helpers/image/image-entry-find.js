module.exports = {
	inputs: {
		productId: {
			type: 'string',
			required: true,
		},
	},

	fn: async (inputs, exits) => {

		const { productId } = inputs

		const waitRead = await Image.find({ productId })

		return exits.success(waitRead);
	}
}