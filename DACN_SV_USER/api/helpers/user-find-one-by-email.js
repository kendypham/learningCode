module.exports = {
	inputs: {
		emailAddress: {
			type: 'string',
			required: true,
		},
	},

	fn: async (inputs, exits) => {
		const { emailAddress } = inputs
		const waitRead = await User.findOne({ where: { emailAddress } }).populate('profile')

		return exits.success(waitRead);

	}
}