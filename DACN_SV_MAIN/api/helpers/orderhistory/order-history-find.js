module.exports = {
	inputs: {
	},

	fn: async (inputs, exits) => {
		let waitRead = await OrderHistory.find({ where: {} })
		return exits.success(waitRead);
	}
}