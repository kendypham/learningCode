module.exports = {
	inputs: {
		id: {
			type: 'string',
			required: true,
		},
	},

	fn: async (inputs, exits) => {

		const { id } = inputs
		const waitRead = await Order.findOne({ where: { id: id } })
		return exits.success(waitRead);
	}
}