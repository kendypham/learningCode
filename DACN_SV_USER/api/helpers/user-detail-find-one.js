module.exports = {
	inputs: {
		id: {
			type: 'string',
			required: true,
		},
	},

	fn: async (inputs, exits) => {

		const { id } = inputs
		const waitRead = await UserDetail.findOne({ where: { id } })
		return exits.success(waitRead);
	}
}