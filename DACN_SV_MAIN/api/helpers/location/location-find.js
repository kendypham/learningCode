module.exports = {
	inputs: {

	},

	fn: async (inputs, exits) => {
		let waitRead = await Location.find({ where: {} })
		return exits.success(waitRead);
	}
}