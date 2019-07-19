module.exports = {
	inputs: {

	},

	fn: async (inputs, exits) => {
		let waitRead = await Rating.find({ where: {} })
		return exits.success(waitRead);
	}
}