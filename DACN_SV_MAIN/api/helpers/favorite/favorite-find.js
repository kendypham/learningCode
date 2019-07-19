module.exports = {
	inputs: {

	},

	fn: async (inputs, exits) => {
		let waitRead = await Favorite.find({ where: {} })
		return exits.success(waitRead);
	}
}