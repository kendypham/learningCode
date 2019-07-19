module.exports = {
	inputs: {

	},

	fn: async (inputs, exits) => {
		let waitRead = await ShippingHistory.find({ where: {} })
		return exits.success(waitRead);
	}
}