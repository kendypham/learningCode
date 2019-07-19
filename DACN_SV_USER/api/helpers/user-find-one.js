module.exports = {
	inputs: {
		id: {
			type: 'string',
			required: true,
		},
	},

	fn: async (inputs, exits) => {

		const { id } = inputs
		const waitRead = await User.findOne({ where: { id } }).populate('profile')
		return exits.success(waitRead);

	}
}