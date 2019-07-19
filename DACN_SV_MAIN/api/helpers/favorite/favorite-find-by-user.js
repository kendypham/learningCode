module.exports = {
	inputs: {
		userId: {
			type: 'string',
			required: true,
		},
	},

	fn: async (inputs, exits) => {
		const { userId } = inputs
		const waitRead = await Favorite.find({where:{ userId: userId }})
		return exits.success(waitRead);
	}
}