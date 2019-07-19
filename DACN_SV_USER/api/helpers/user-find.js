module.exports = {
	inputs: {
		limit: {
			type: 'number',
		},
		skip: {
			type: 'number',
		},
		permission: {
			type: 'string',
		},
	},

	fn: async (inputs, exits) => {
		const { permission, limit, skip } = inputs
		if (String(permission).length < 1) {

			var waitRead = await User.find({ where: {}, limit: limit, skip: skip }).populate('profile')
		} else {
			var waitRead = await User.find({ where: { permission: permission }, limit: limit, skip }).populate('profile')
		}
		return exits.success(waitRead);
	}
}