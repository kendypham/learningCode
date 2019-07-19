module.exports = {
	inputs: {
	},

	fn: async (inputs, exits) => {

		const waitRead = await OrderItem.find({ where: {} })
		return exits.success(waitRead);
	}
}