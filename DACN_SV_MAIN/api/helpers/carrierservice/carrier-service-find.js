module.exports = {
	inputs: {

	},

	fn: async (inputs, exits) => {
		let waitRead = await CarrierService.find()
		return exits.success(waitRead);
	}
}